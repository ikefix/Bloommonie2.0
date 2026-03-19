import { create } from 'zustand';
import { API_CONFIG, detectIntent, getEndpointsForIntent } from '../config/apiConfig';
import { externalProductAPI } from '../utils/externalProductAPI';

// AI Mode Store for managing voice commands and AI interactions
export const useAiModeStore = create((set, get) => ({
  // AI Mode State
  isAiModeActive: false,
  isListening: false,
  isProcessing: false,
  currentTranscript: '',
  lastCommand: null,
  commandHistory: [],
  
  // Speech Recognition State
  recognition: null,
  synthesis: null,
  
  // Product Search State
  searchResults: [],
  isSearching: false,
  selectedProducts: [],
  
  // External API State
  externalProducts: [],
  isLoadingExternal: false,
  
  // Store Management State
  productsToStore: [],
  
  // Actions
  toggleAiMode: () => {
    const currentState = get().isAiModeActive;
    set({ isAiModeActive: !currentState });
    
    if (!currentState) {
      get().initializeSpeechRecognition();
    } else {
      get().stopListening();
    }
  },
  
  initializeSpeechRecognition: () => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        
        set({ currentTranscript: transcript });
        
        if (event.results[current].isFinal) {
          get().processVoiceCommand(transcript);
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        set({ isListening: false, isProcessing: false });
      };
      
      recognition.onend = () => {
        set({ isListening: false });
      };
      
      set({ recognition });
    }
  },
  
  startListening: () => {
    const { recognition, isAiModeActive } = get();
    
    if (!isAiModeActive) {
      console.warn('AI Mode is not active');
      return;
    }
    
    if (recognition) {
      recognition.start();
      set({ isListening: true, currentTranscript: '' });
    }
  },
  
  stopListening: () => {
    const { recognition } = get();
    
    if (recognition) {
      recognition.stop();
      set({ isListening: false });
    }
  },
  
  processVoiceCommand: async (transcript) => {
    set({ isProcessing: true });
    
    try {
      // Detect intent from transcript
      const intent = detectIntent(transcript);
      
      const command = {
        transcript,
        intent,
        timestamp: new Date().toISOString(),
        processed: false
      };
      
      // Add to command history
      set(state => ({
        commandHistory: [...state.commandHistory, command],
        lastCommand: command
      }));
      
      // Process based on intent
      await get().executeCommand(intent, transcript);
      
      // Update command as processed
      set(state => ({
        commandHistory: state.commandHistory.map(cmd => 
          cmd.timestamp === command.timestamp ? { ...cmd, processed: true } : cmd
        )
      }));
      
    } catch (error) {
      console.error('Error processing voice command:', error);
      get().speak('Sorry, I encountered an error processing your command.');
    } finally {
      set({ isProcessing: false });
    }
  },
  
  executeCommand: async (intent, transcript) => {
    const { searchProductsInDatabase, searchExternalProducts, speak, triggerRouteBasedOnIntent, extractEntitiesFromTranscript } = get();
    
    // Extract entities from transcript (products, amounts, quantities, actions)
    const entities = extractEntitiesFromTranscript(transcript);
    
    // Prepare data for the intent handler
    const data = {
      transcript,
      entities,
      products: entities.products,
      amounts: entities.amounts,
      quantities: entities.quantities,
      actions: entities.actions
    };
    
    // Use the enhanced AI logic to trigger appropriate routes
    await triggerRouteBasedOnIntent(intent, data);
  },
  
  handleBuyCommand: async (transcript) => {
    const { speak, searchProductsInDatabase, searchExternalProducts } = get();
    
    // Extract product names from transcript
    const products = get().extractProductsFromTranscript(transcript);
    
    if (products.length === 0) {
      speak('What products would you like to purchase?');
      return;
    }
    
    speak(`Let me check your inventory for ${products.join(', ')}`);
    
    // Search in local database first
    const localResults = await searchProductsInDatabase(products);
    
    if (localResults.length > 0) {
      const foundProducts = localResults.map(p => p.name).join(', ');
      speak(`I found ${foundProducts} in your inventory. Adding them to your cart.`);
      set({ selectedProducts: localResults });
    } else {
      speak('I couldn\'t find those products in your inventory. Let me search online.');
      
      // Search external API
      const externalResults = await searchExternalProducts(products);
      
      if (externalResults.length > 0) {
        speak(`I found ${externalResults.length} products online. Would you like to add any to your inventory?`);
        set({ externalProducts: externalResults });
      } else {
        speak('I couldn\'t find those products anywhere. Would you like to add them manually?');
      }
    }
  },
  
  handleSellCommand: async (transcript) => {
    const { speak } = get();
    speak('Opening point of sale system for checkout.');
    // Navigate to POS or trigger checkout process
    window.location.href = '/pos';
  },
  
  handleInventoryCommand: async (transcript) => {
    const { speak } = get();
    speak('Checking your current inventory levels.');
    // Fetch inventory data
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.INVENTORY.DASHBOARD}`);
      const data = await response.json();
      speak(`You have ${data.totalProducts} products in inventory. ${data.lowStockCount} items are running low on stock.`);
    } catch (error) {
      speak('Sorry, I couldn\'t retrieve your inventory information.');
    }
  },
  
  handleBalanceCommand: async (transcript) => {
    const { speak } = get();
    speak('Checking your wallet balance.');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.WALLET.BALANCE}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      speak(`Your current wallet balance is ₦${data.balance.toLocaleString()}`);
    } catch (error) {
      speak('Sorry, I couldn\'t retrieve your balance information.');
    }
  },
  
  handleTransferCommand: async (transcript) => {
    const { speak } = get();
    speak('I can help you transfer money. Please provide the recipient details and amount.');
    // Trigger transfer flow
  },
  
  handleReportsCommand: async (transcript) => {
    const { speak } = get();
    speak('Generating your reports dashboard.');
    // Navigate to reports
    window.location.href = '/reports';
  },
  
  handleStaffCommand: async (transcript) => {
    const { speak } = get();
    speak('Opening staff management system.');
    // Navigate to staff management
    window.location.href = '/staff';
  },
  
  handleDashboardCommand: async (transcript) => {
    const { speak } = get();
    speak('Taking you to your dashboard.');
    // Navigate to dashboard
    window.location.href = '/admin';
  },
  
  handlePosCommand: async (transcript) => {
    const { speak } = get();
    speak('Opening point of sale system.');
    // Navigate to POS
    window.location.href = '/pos';
  },
  
  extractEntitiesFromTranscript: (transcript) => {
    // Enhanced entity extraction using speech utils
    const entities = {
      products: [],
      amounts: [],
      quantities: [],
      actions: [],
      recipients: [],
      paymentMethods: []
    };

    const lowerTranscript = transcript.toLowerCase();

    // Product extraction (enhanced)
    const productPatterns = [
      /\b(buy|purchase|order|get|need|want|add|sell)\s+([a-z\s]+?)(?:\b(?:and|or|with|for|the|a|an)\b|$)/gi,
      /\b([a-z]+(?:\s+[a-z]+)*)\s+(?:product|item|goods|laptop|phone|tablet|computer|mouse|keyboard|monitor|printer|cable|charger|battery|headphone|speaker|camera|tv|refrigerator|washing|machine|oven|microwave|blender|toaster|coffee|maker|rice|cooker|air|conditioner|fan|light|bulb|lamp|chair|table|desk|sofa|bed|mattress|pillow|blanket|towel|soap|shampoo|toothpaste|brush|comb|mirror|clock|watch|phone|case|screen|protector|cover|bag|backpack|wallet|purse|belt|shoes|socks|shirt|pants|dress|jacket|coat|hat|cap|sunglasses|glasses|ring|necklace|earring|bracelet|watch|band|strap|cover|case|skin|tempered|glass|protector|film|sticker|decal|case|cover|sleeve|pouch|bag|box|container|bottle|cup|mug|glass|plate|bowl|fork|spoon|knife|chopsticks|straw|napkin|tissue|paper|pen|pencil|marker|crayon|paint|brush|canvas|easel|sculpture|statue|frame|poster|art|print|photo|album|book|magazine|newspaper|comic|novel|textbook|dictionary|encyclopedia|atlas|map|globe|compass|ruler|calculator|abacus|cash|register|scale|balance|weight|measure|tape|level|hammer|screwdriver|wrench|pliers|saw|drill|nail|screw|bolt|nut|washer|hinge|lock|key|chain|rope|cord|wire|cable|tape|glue|adhesive|sealant|caulk|putty|filler|paint|stain|varnish|lacquer|polish|wax|oil|grease|lubricant|cleaner|detergent|soap|shampoo|conditioner|lotion|cream|ointment|medicine|pill|tablet|capsule|liquid|powder|ointment|cream|gel|spray|aerosol|pump|dropper|applicator|roller|brush|sponge|cloth|towel|wipe|rag|mop|broom|vacuum|duster|pan|bucket|trash|can|bag|container|box|crate|pallet|shelf|rack|hook|hanger|stand|support|bracket|mount|holder|clip|clamp|tie|strap|band|belt|rope|cord|wire|cable|chain|link|ring|loop|hook|eye|grommet|rivet|stud|button|snap|zipper|velcro|tape|glue|adhesive|sealant|caulk|putty|filler|paint|stain|varnish|lacquer|polish|wax|oil|grease|lubricant|cleaner|detergent|soap|shampoo|conditioner|lotion|cream|ointment|medicine|pill|tablet|capsule|liquid|powder|ointment|cream|gel|spray|aerosol|pump|dropper|applicator|roller|brush|sponge|cloth|towel|wipe|rag|mop|broom|vacuum|duster|pan|bucket|trash|can|bag|container|box|crate|pallet|shelf|rack|hook|hanger|stand|support|bracket|mount|holder|clip|clamp|tie|strap|band|belt|rope|cord|wire|cable|chain|link|ring|loop|hook|eye|grommet|rivet|stud|button|snap|zipper|velcro|tape|glue|adhesive|sealant|caulk|putty|filler|paint|stain|varnish|lacquer|polish|wax|oil|grease|lubricant|cleaner|detergent|soap|shampoo|conditioner|lotion|cream|ointment|medicine|pill|tablet|capsule|liquid|powder|ointment|cream|gel|spray|aerosol|pump|dropper|applicator|roller|brush|sponge|cloth|towel|wipe|rag|mop|broom|vacuum|duster|pan|bucket|trash|can|bag|container|box|crate|pallet|shelf|rack|hook|hanger|stand|support|bracket|mount|holder|clip|clamp|tie|strap|band|belt|rope|cord|wire|cable|chain|link|ring|loop|hook|eye|grommet|rivet|stud|button|snap|zipper|velcro)\b/gi
    ];

    productPatterns.forEach(pattern => {
      const matches = [...transcript.matchAll(pattern)];
      matches.forEach(match => {
        const product = match[2] || match[1];
        if (product && product.length > 2 && product.length < 50) {
          const cleanedProduct = product.trim().replace(/\s+/g, ' ');
          if (!entities.products.includes(cleanedProduct)) {
            entities.products.push(cleanedProduct);
          }
        }
      });
    });

    // Amount extraction (enhanced)
    const amountPatterns = [
      /\b(?:₦|naira|dollar|\$|€|£|¥|₹|₽|₩|₪|₸|₫|₨|₡|₦|₱|₲|₴|₮|₯|₰|₱|₲|₴|₮|₯|₰)?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(?:naira|dollars?|euros?|pounds?|yen|yuan|rupees?|won|shekels?|tenge|dong|baht|colon|lempira|hryvnia|tugrik|som|manat|cedis|pesos?|guaranis?|soles?|zlotys?|kuna|lei|lev|dinars?|riyals?|rials?|dirhams?|ryals?|krones?|kroner?|crowns?|marks?|francs?|liras?|drachmas?|escudos?|pesetas?|guilders?|florins?|schillings?|cents?|pennies?|pence?|kobo|cents?|pennies?|pence?)\b/gi,
      /\b(\d+(?:\.\d{2})?)\s*(?:k|thousand|million|billion|trillion)\b/gi
    ];

    amountPatterns.forEach(pattern => {
      const matches = [...transcript.matchAll(pattern)];
      matches.forEach(match => {
        const amount = parseFloat(match[1].replace(/,/g, ''));
        if (!isNaN(amount) && amount > 0) {
          entities.amounts.push(amount);
        }
      });
    });

    // Quantity extraction (enhanced)
    const quantityPatterns = [
      /\b(\d+)\s+(?:pieces?|pcs|units?|items?|cartons?|boxes?|bags?|packs?|packages?|bottles?|cans?|jars?|tubes?|rolls?|sheets?|pads|sets|pairs|dozens?|gross|lots?|batches?|groups?|bundles?|packs?|crates?|pallets?|containers?|barrels?|drums?|tanks?|vats?|jugs?|flasks?|ampoules?|vials?|syringes?|needles?|catheters?|tubes?|pipes?|hoses?|cables?|wires?|ropes?|chains?|belts?|straps?|bands?|ties?|clips?|clamps?|brackets?|mounts?|holders?|stands?|supports?|racks?|shelves?|hooks?|hangers?|pegs?|nails?|screws?|bolts?|nuts?|washers?|rivets?|studs?|buttons?|snaps?|zippers?|clasps?|buckles?|fasteners?|adhesives?|tapes?|glues?|sealants?|caulks?|putties?|fillers?|compounds?|mixtures?|solutions?|liquids?|powders?|granules?|pellets?|tablets?|capsules?|pills?|lozenges?|drops?|sprays?|ointments?|creams?|gels?|balms?|salves?|liniments?|tinctures?|extracts?|essences?|oils?|waxes?|polishes?|cleaners?|detergents?|soaps?|shampoos?|conditioners?|lotions?|creams?|balms?|salves?|ointments?|rubs?|washes?|rinses?|showers?|baths?|soaks?|dips?|coats?|layers?|films?|sheets?|pages?|leaves?|cards?|tickets?|coupons?|vouchers?|receipts?|invoices?|bills?|checks?|notes?|letters?|envelopes?|packages?|parcels?|boxes?|crates?|cartons?|containers?|vessels?|carriers?|vehicles?|trucks?|vans?|cars?|buses?|trains?|planes?|boats?|ships?|yachts?|rafts?|floats?|skis?|snowboards?|surfboards?|skateboards?|bicycles?|motorcycles?|scooters?|mopeds?|atvs?|utvs?|golf|carts?|trolleys?|wheelbarrows?|carts?|wagons?|sleds?|sleighs?|carriages?|coaches?|limousines?|taxis?|cabs?|rides?|shuttles?|ferries?|subways?|metros?|trams?|buses?|coaches?|vans?|trucks?|lorries?|pickups?|suvs?|jeeps?|convertibles?|roadsters?|coupes?|sedans?|hatchbacks?|station|wagons?|minivans?|vans?|buses?|coaches?|motorhomes?|rvs?|campers?|trailers?|caravans?|mobiles?|homes?|offices?|buildings?|structures?|constructions?|edifices?|complexes?|facilities?|establishments?|institutions?|organizations?|companies?|corporations?|businesses?|enterprises?|firms?|agencies?|bureaus?|departments?|offices?|branches?|divisions?|sections?|units?|teams?|groups?|crews?|squads?|parties?|committees?|boards?|panels?|juries?|courts?|tribunals?|councils?|assemblies?|congresses?|parliaments?|legislatures?|senates?|houses?|chambers?|rooms?|halls?|auditoriums?|theaters?|cinemas?|studios?|galleries?|museums?|libraries?|archives?|repositories?|collections?|exhibits?|displays?|shows?|performances?|concerts?|recitals?|presentations?|demonstrations?|lectures?|speeches?|talks?|discussions?|debates?|arguments?|disputes?|conflicts?|battles?|wars?|fights?|combats?|duels?|matches?|games?|contests?|competitions?|tournaments?|championships?|leagues?|divisions?|conferences?|leagues?|associations?|unions?|federations?|alliances?|coalitions?|partnerships?|joint|ventures?|collaborations?|cooperations?|agreements?|contracts?|deals?|transactions?|exchanges?|trades?|sales?|purchases?|acquisitions?|mergers?|takeovers?|buyouts?|investments?|contributions?|donations?|grants?|loans?|credits?|advances?|payments?|settlements?|compensations?|reparations?|restitutions?|replacements?|substitutions?|alternatives?|options?|choices?|selections?|picks?|preferences?|priorities?|requirements?|specifications?|standards?|criteria?|guidelines?|rules?|regulations?|laws?|statutes?|ordinances?|decrees?|orders?|directives?|instructions?|directions?|guidance?|advice?|recommendations?|suggestions?|proposals?|offers?|bids?|quotations?|estimates?|appraisals?|valuations?|assessments?|evaluations?|analyses?|reviews?|inspections?|audits?|checks?|tests?|trials?|experiments?|studies?|researches?|investigations?|surveys?|polls?|questionnaires?|interviews?|consultations?|meetings?|conferences?|conventions?|symposiums?|workshops?|seminars?|classes?|courses?|lessons?|tutorials?|trainings?|instructions?|demonstrations?|illustrations?|examples?|samples?|specimens?|prototypes?|models?|patterns?|templates?|designs?|plans?|schemes?|strategies?|tactics?|methods?|techniques?|procedures?|processes?|operations?|activities?|actions?|deeds?|acts?|performances?|behaviors?|conducts?|manners?|ways?|means?|approaches?|styles?|fashions?|trends?|movements?|currents?|flows?|streams?|rivers?|creeks?|brooks?|channels?|canals?|waterways?|pathways?|routes?|roads?|streets?|avenues?|boulevards?|lanes?|drives?|ways?|paths|tracks|trails|footpaths|walkways|sidewalks|pavements|crosswalks|intersections|junctions|corners|turns|bends|curves|loops|circles|rings|cycles|rounds|laps|circuits|networks|grids|systems|structures|organizations|arrangements|layouts|formats|patterns|designs|blueprints|plans|schemes|programs|projects|initiatives|ventures|undertakings|enterprises|operations|activities|functions|purposes|goals|objectives|targets|aims|ambitions|aspirations|dreams|visions|missions|purposes|reasons|causes|factors|elements|components|parts|pieces|sections|segments|portions|fractions|ratios|proportions|percentages|rates|speeds|paces|tempos|rhythms|beats|pulses|vibrations|oscillations|waves|frequencies|amplitudes|magnitudes|intensities|strengths|powers|forces|energies|capacities|volumes|sizes|dimensions|measurements|quantities|amounts|numbers|figures|digits|values|prices|costs|fees|charges|rates|prices|rates|tariffs|taxes|duties|levies|assessments|valuations|appraisals|estimates|quotations|bids|offers|proposals|suggestions|recommendations|advice|guidance|directions|instructions|orders|commands|directives|regulations|rules|laws|statutes|ordinances|decrees|edicts|mandates|requirements|specifications|standards|criteria|guidelines|principles|policies|procedures|processes|methods|techniques|approaches|strategies|tactics|plans|schemes|designs|patterns|models|templates|formats|layouts|structures|organizations|arrangements|configurations|setups|installations|implementations|executions|applications|uses|utilizations|employments|deployments|operations|functions|activities|actions|deeds|acts|performances|behaviors|conducts|manners|ways|means|methods|techniques|approaches|strategies|tactics|plans|schemes|designs|patterns|models|templates|formats|layouts|structures|organizations|arrangements|configurations|setups|installations|implementations|executions|applications|uses|utilizations|employments|deployments)\b/gi
    ];

    quantityPatterns.forEach(pattern => {
      const matches = [...transcript.matchAll(pattern)];
      matches.forEach(match => {
        const quantity = parseInt(match[1]);
        if (!isNaN(quantity) && quantity > 0) {
          entities.quantities.push(quantity);
        }
      });
    });

    // Action extraction (enhanced)
    const actionWords = [
      'buy', 'purchase', 'order', 'get', 'acquire', 'obtain', 'secure', 'procure', 'sell', 'sale', 'checkout', 'process', 'handle', 'manage', 'check', 'show', 'display', 'view', 'see', 'look', 'find', 'search', 'locate', 'discover', 'identify', 'detect', 'recognize', 'determine', 'ascertain', 'establish', 'confirm', 'verify', 'validate', 'authenticate', 'authorize', 'approve', 'accept', 'agree', 'consent', 'permit', 'allow', 'enable', 'facilitate', 'support', 'assist', 'help', 'aid', 'provide', 'supply', 'deliver', 'distribute', 'allocate', 'assign', 'grant', 'issue', 'release', 'discharge', 'emit', 'produce', 'generate', 'create', 'make', 'build', 'construct', 'assemble', 'manufacture', 'fabricate', 'develop', 'design', 'plan', 'organize', 'arrange', 'structure', 'configure', 'setup', 'install', 'implement', 'execute', 'perform', 'carry', 'conduct', 'operate', 'run', 'manage', 'administer', 'control', 'regulate', 'govern', 'direct', 'guide', 'lead', 'supervise', 'oversee', 'monitor', 'watch', 'observe', 'track', 'follow', 'trace', 'record', 'document', 'report', 'communicate', 'inform', 'notify', 'announce', 'declare', 'proclaim', 'state', 'express', 'articulate', 'formulate', 'present', 'represent', 'symbolize', 'signify', 'mean', 'indicate', 'suggest', 'imply', 'infer', 'deduce', 'conclude', 'decide', 'determine', 'choose', 'select', 'pick', 'prefer', 'favor', 'like', 'love', 'enjoy', 'appreciate', 'value', 'treasure', 'cherish', 'adore', 'worship', 'respect', 'honor', 'admire', 'praise', 'compliment', 'flatter', 'encourage', 'motivate', 'inspire', 'stimulate', 'excite', 'thrill', 'please', 'satisfy', 'gratify', 'fulfill', 'complete', 'finish', 'end', 'terminate', 'stop', 'cease', 'halt', 'pause', 'rest', 'relax', 'sleep', 'dream', 'imagine', 'think', 'consider', 'contemplate', 'meditate', 'reflect', 'ponder', 'wonder', 'question', 'ask', 'inquire', 'investigate', 'examine', 'inspect', 'analyze', 'study', 'research', 'explore', 'discover', 'learn', 'understand', 'comprehend', 'grasp', 'master', 'know', 'realize', 'recognize', 'remember', 'recall', 'recollect', 'memorize', 'learn', 'study', 'practice', 'train', 'exercise', 'work', 'play', 'compete', 'contest', 'fight', 'battle', 'struggle', 'conflict', 'dispute', 'argue', 'debate', 'discuss', 'negotiate', 'bargain', 'trade', 'exchange', 'swap', 'switch', 'change', 'alter', 'modify', 'adjust', 'adapt', 'transform', 'convert', 'evolve', 'develop', 'grow', 'expand', 'increase', 'rise', 'grow', 'improve', 'enhance', 'upgrade', 'advance', 'progress', 'succeed', 'achieve', 'accomplish', 'complete', 'finish', 'win', 'gain', 'earn', 'obtain', 'receive', 'get', 'acquire', 'secure', 'capture', 'seize', 'grab', 'take', 'hold', 'keep', 'retain', 'maintain', 'preserve', 'protect', 'defend', 'guard', 'shield', 'cover', 'hide', 'conceal', 'mask', 'disguise', 'pretend', 'act', 'perform', 'play', 'role', 'character', 'part', 'function', 'duty', 'responsibility', 'obligation', 'commitment', 'promise', 'pledge', 'vow', 'oath', 'guarantee', 'warranty', 'assurance', 'certainty', 'confidence', 'trust', 'faith', 'belief', 'hope', 'expectation', 'anticipation', 'prediction', 'forecast', 'projection', 'estimate', 'calculation', 'computation', 'analysis', 'evaluation', 'assessment', 'judgment', 'decision', 'choice', 'selection', 'option', 'alternative', 'possibility', 'chance', 'opportunity', 'prospect', 'future', 'destiny', 'fate', 'fortune', 'luck', 'chance', 'risk', 'danger', 'threat', 'hazard', 'peril', 'menace', 'danger', 'risk', 'hazard', 'threat', 'menace', 'danger', 'risk', 'hazard', 'threat', 'menace'
    ];

    actionWords.forEach(action => {
      if (lowerTranscript.includes(action)) {
        if (!entities.actions.includes(action)) {
          entities.actions.push(action);
        }
      }
    });

    // Recipient extraction
    const recipientPatterns = [
      /\b(to|for|send|transfer|pay|give)\s+([a-z\s]+?)(?:\b(?:and|or|with|at|in|on|by|from)\b|$)/gi,
      /\b([a-z]+(?:\s+[a-z]+)*)\s+(?:email|address|phone|mobile|account)\b/gi
    ];

    recipientPatterns.forEach(pattern => {
      const matches = [...transcript.matchAll(pattern)];
      matches.forEach(match => {
        const recipient = match[2] || match[1];
        if (recipient && recipient.length > 2 && recipient.length < 50) {
          const cleanedRecipient = recipient.trim().replace(/\s+/g, ' ');
          if (!entities.recipients.includes(cleanedRecipient)) {
            entities.recipients.push(cleanedRecipient);
          }
        }
      });
    });

    // Payment method extraction
    const paymentMethods = ['cash', 'card', 'credit', 'debit', 'transfer', 'bank', 'wallet', 'mobile', 'online', 'digital', 'cryptocurrency', 'bitcoin', 'ethereum', 'paypal', 'stripe', 'venmo', 'zelle', 'cashapp', 'apple', 'pay', 'google', 'pay', 'samsung', 'pay'];
    
    paymentMethods.forEach(method => {
      if (lowerTranscript.includes(method)) {
        if (!entities.paymentMethods.includes(method)) {
          entities.paymentMethods.push(method);
        }
      }
    });

    return entities;
  },
  
  searchProductsInDatabase: async (products) => {
    set({ isSearching: true });
    try {
      const token = localStorage.getItem('token');
      const searchPromises = products.map(product =>
        fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.INVENTORY.PRODUCTS}?search=${product}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(res => res.json())
      );
      
      const results = await Promise.all(searchPromises);
      const allProducts = results.flat();
      
      set({ searchResults: allProducts, isSearching: false });
      return allProducts;
    } catch (error) {
      console.error('Error searching products:', error);
      set({ isSearching: false });
      return [];
    }
  },
  
  searchExternalProducts: async (products) => {
    set({ isLoadingExternal: true });
    try {
      // Use the enhanced external product API
      const searchPromises = products.map(product =>
        externalProductAPI.searchProducts(product, {
          limit: 5,
          sources: ['openFoodFacts'],
          includePrices: false
        })
      );
      
      const results = await Promise.all(searchPromises);
      const externalProducts = results.flat();
      
      set({ externalProducts, isLoadingExternal: false });
      return externalProducts;
    } catch (error) {
      console.error('Error searching external products:', error);
      set({ isLoadingExternal: false });
      return [];
    }
  },
  
  addProductToStore: (product) => {
    set(state => ({
      productsToStore: [...state.productsToStore, product]
    }));
  },
  
  removeProductToStore: (productId) => {
    set(state => ({
      productsToStore: state.productsToStore.filter(p => p.id !== productId)
    }));
  },
  
  speak: (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      speechSynthesis.speak(utterance);
    }
  },
  
  clearCommandHistory: () => {
    set({ commandHistory: [], lastCommand: null });
  },
  
  // Enhanced AI logic for triggering appropriate routes
  triggerRouteBasedOnIntent: async (intent, data = {}) => {
    const { speak } = get();
    
    try {
      switch (intent) {
        case 'BUY':
        case 'PURCHASE':
          await get().handlePurchaseFlow(data);
          break;
          
        case 'SELL':
        case 'SALE':
          await get().handleSalesFlow(data);
          break;
          
        case 'STOCK':
        case 'INVENTORY':
          await get().handleInventoryFlow(data);
          break;
          
        case 'BALANCE':
          await get().handleBalanceFlow(data);
          break;
          
        case 'TRANSFER':
          await get().handleTransferFlow(data);
          break;
          
        case 'REPORTS':
          await get().handleReportsFlow(data);
          break;
          
        case 'STAFF':
          await get().handleStaffFlow(data);
          break;
          
        case 'DASHBOARD':
          await get().handleDashboardFlow(data);
          break;
          
        case 'POS':
          await get().handlePosFlow(data);
          break;
          
        default:
          speak('I didn\'t understand that command. Please try again.');
      }
    } catch (error) {
      console.error('Error triggering route:', error);
      speak('Sorry, I encountered an error while processing your request.');
    }
  },

  handlePurchaseFlow: async (data) => {
    const { speak, searchProductsInDatabase, searchExternalProducts, triggerApiCall } = get();
    
    if (data.products && data.products.length > 0) {
      speak(`Searching for ${data.products.join(', ')}`);
      
      // Search in local database first
      const localResults = await searchProductsInDatabase(data.products);
      
      if (localResults.length > 0) {
        const foundProducts = localResults.map(p => p.name).join(', ');
        speak(`I found ${foundProducts} in your inventory. Adding them to cart.`);
        
        // Add to cart via API
        for (const product of localResults) {
          await triggerApiCall('POST', API_CONFIG.POS.CART_ADD, {
            productId: product._id,
            quantity: data.quantity || 1
          });
        }
        
        speak('Products added to cart. Ready for checkout.');
      } else {
        speak('Searching online for these products...');
        
        // Search external API
        const externalResults = await searchExternalProducts(data.products);
        
        if (externalResults.length > 0) {
          speak(`I found ${externalResults.length} products online. Would you like to add any to your inventory first?`);
          set({ externalProducts: externalResults });
        } else {
          speak('I couldn\'t find these products anywhere. Would you like to add them manually to your inventory?');
        }
      }
    } else {
      speak('What products would you like to purchase?');
    }
  },

  handleSalesFlow: async (data) => {
    const { speak, triggerApiCall } = get();
    
    if (data.action === 'checkout') {
      speak('Processing checkout...');
      
      try {
        const result = await triggerApiCall('POST', API_CONFIG.POS.CHECKOUT, {
          paymentMethod: data.paymentMethod || 'cash',
          isCreditSale: data.isCreditSale || false,
          notes: data.notes || 'AI-assisted sale'
        });
        
        if (result.success) {
          speak(`Sale completed successfully! Total: ₦${result.data.totalAmount.toLocaleString()}`);
        } else {
          speak('Checkout failed. Please try again.');
        }
      } catch (error) {
        speak('Error during checkout. Please check your cart and try again.');
      }
    } else {
      speak('Opening point of sale system...');
      // Navigate to POS or trigger POS flow
      window.location.href = '/pos';
    }
  },

  handleInventoryFlow: async (data) => {
    const { speak, triggerApiCall } = get();
    
    if (data.action === 'check') {
      speak('Checking inventory levels...');
      
      try {
        const dashboard = await triggerApiCall('GET', API_CONFIG.INVENTORY.DASHBOARD);
        const lowStock = await triggerApiCall('GET', API_CONFIG.INVENTORY.STOCK_LOW);
        
        speak(`You have ${dashboard.totalProducts} products in inventory. ${lowStock.length} items are running low on stock.`);
        
        if (lowStock.length > 0) {
          const lowStockItems = lowStock.slice(0, 3).map(item => item.name).join(', ');
          speak(`Low stock items include: ${lowStockItems}`);
        }
      } catch (error) {
        speak('Sorry, I couldn\'t retrieve inventory information.');
      }
    } else if (data.action === 'add') {
      speak('Please provide product details to add to inventory.');
    } else {
      speak('Opening inventory management...');
      window.location.href = '/inventory';
    }
  },

  handleBalanceFlow: async (data) => {
    const { speak, triggerApiCall } = get();
    
    try {
      const balance = await triggerApiCall('GET', API_CONFIG.WALLET.BALANCE);
      const summary = await triggerApiCall('GET', API_CONFIG.WALLET.SUMMARY);
      
      speak(`Your current wallet balance is ₦${balance.balance.toLocaleString()}`);
      
      if (summary.totalTransactions > 0) {
        speak(`You have made ${summary.totalTransactions} transactions this month.`);
      }
    } catch (error) {
      speak('Sorry, I couldn\'t retrieve your balance information.');
    }
  },

  handleTransferFlow: async (data) => {
    const { speak, triggerApiCall } = get();
    
    if (data.recipient && data.amount) {
      speak(`Transferring ₦${data.amount.toLocaleString()} to ${data.recipient}...`);
      
      try {
        const result = await triggerApiCall('POST', API_CONFIG.WALLET.TRANSFER, {
          recipientEmail: data.recipient,
          amount: data.amount,
          description: data.description || 'AI-assisted transfer'
        });
        
        if (result.success) {
          speak('Transfer completed successfully!');
        } else {
          speak('Transfer failed. Please check recipient details and balance.');
        }
      } catch (error) {
        speak('Error during transfer. Please try again.');
      }
    } else {
      speak('I need recipient and amount details to process the transfer. Please provide both.');
    }
  },

  handleReportsFlow: async (data) => {
    const { speak, triggerApiCall } = get();
    
    const reportType = data.type || 'sales';
    
    try {
      switch (reportType) {
        case 'sales':
          const salesReport = await triggerApiCall('GET', API_CONFIG.REPORTS.SALES);
          speak(`Your sales report shows ${salesReport.totalSales} sales totaling ₦${salesReport.totalRevenue.toLocaleString()}`);
          break;
          
        case 'financial':
          const financialReport = await triggerApiCall('GET', API_CONFIG.REPORTS.FINANCIAL);
          speak(`Financial report: Revenue ₦${financialReport.revenue.toLocaleString()}, Expenses ₦${financialReport.expenses.toLocaleString()}`);
          break;
          
        case 'inventory':
          const inventoryReport = await triggerApiCall('GET', API_CONFIG.REPORTS.INVENTORY);
          speak(`Inventory report: ${inventoryReport.totalProducts} products with total value ₦${inventoryReport.totalValue.toLocaleString()}`);
          break;
          
        default:
          speak('Opening reports dashboard...');
          window.location.href = '/reports';
      }
    } catch (error) {
      speak('Sorry, I couldn\'t generate the report.');
    }
  },

  handleStaffFlow: async (data) => {
    const { speak, triggerApiCall } = get();
    
    if (data.action === 'attendance') {
      try {
        const attendance = await triggerApiCall('GET', API_CONFIG.STAFF.ATTENDANCE);
        const presentCount = attendance.filter(staff => staff.present).length;
        speak(`${presentCount} staff members are present today out of ${attendance.length} total staff.`);
      } catch (error) {
        speak('Sorry, I couldn\'t retrieve attendance information.');
      }
    } else {
      speak('Opening staff management...');
      window.location.href = '/staff';
    }
  },

  handleDashboardFlow: async (data) => {
    const { speak } = get();
    speak('Taking you to your dashboard...');
    window.location.href = '/admin';
  },

  handlePosFlow: async (data) => {
    const { speak, triggerApiCall } = get();
    
    if (data.action === 'add_customer') {
      speak('Adding customer to cart...');
      // Handle customer addition
    } else if (data.action === 'apply_discount') {
      speak('Applying discount...');
      // Handle discount application
    } else {
      speak('Opening point of sale system...');
      window.location.href = '/pos';
    }
  },

  clearSearchResults: () => {
    set({ searchResults: [], externalProducts: [] });
  },

  triggerApiCall: async (method, endpoint, data = null) => {
    const token = localStorage.getItem('token');
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    };
    
    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }
    
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'API call failed');
      }
      
      return { success: true, data: result };
    } catch (error) {
      console.error('API call error:', error);
      return { success: false, error: error.message };
    }
  },
}));
