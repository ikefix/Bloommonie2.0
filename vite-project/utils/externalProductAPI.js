// External Product API Integration
// This file handles integration with various product APIs for worldwide product search

export class ExternalProductAPI {
  constructor() {
    this.apis = {
      openFoodFacts: {
        baseUrl: 'https://world.openfoodfacts.org/api/v2',
        enabled: true
      },
      upcDatabase: {
        baseUrl: 'https://api.upcdatabase.org',
        enabled: false, // Requires API key
        apiKey: null
      },
      serpApi: {
        baseUrl: 'https://serpapi.com',
        enabled: false, // Requires API key
        apiKey: null
      }
    };
  }

  // Search products using Open Food Facts API (free)
  async searchOpenFoodFacts(query, limit = 10) {
    try {
      const response = await fetch(
        `${this.apis.openFoodFacts.baseUrl}/search?search_terms=${encodeURIComponent(query)}&page_size=${limit}&fields=product_name,brands,categories,image_front_url,code,ingredients_text,nutrition_grades`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.products?.map(product => ({
        id: product.code,
        name: product.product_name || product.product_name_en || 'Unknown Product',
        brand: product.brands || 'Unknown Brand',
        category: product.categories?.split(',')[0] || 'Uncategorized',
        image: product.image_front_url,
        barcode: product.code,
        description: product.ingredients_text || `Product: ${product.product_name}`,
        nutritionGrade: product.nutrition_grades,
        source: 'Open Food Facts',
        apiSource: 'openFoodFacts',
        price: null, // Price not available in this API
        currency: null,
        availability: 'unknown',
        rating: product.nutrition_grades ? this.convertNutritionGrade(product.nutrition_grades) : null
      })) || [];
    } catch (error) {
      console.error('Error searching Open Food Facts:', error);
      return [];
    }
  }

  // Search products using UPC Database (requires API key)
  async searchUPCDatabase(query) {
    if (!this.apis.upcDatabase.enabled || !this.apis.upcDatabase.apiKey) {
      console.warn('UPC Database API not configured');
      return [];
    }

    try {
      const response = await fetch(
        `${this.apis.upcDatabase.baseUrl}/search?apikey=${this.apis.upcDatabase.apiKey}&query=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.items?.map(item => ({
        id: item.upc,
        name: item.title || item.description || 'Unknown Product',
        brand: item.brand || 'Unknown Brand',
        category: item.category || 'Uncategorized',
        image: item.image_url,
        barcode: item.upc,
        description: item.description || `Product: ${item.title}`,
        source: 'UPC Database',
        apiSource: 'upcDatabase',
        price: item.price || null,
        currency: item.currency || 'USD',
        availability: item.available ? 'available' : 'unavailable',
        rating: null
      })) || [];
    } catch (error) {
      console.error('Error searching UPC Database:', error);
      return [];
    }
  }

  // Search products using Google Shopping via SerpApi (requires API key)
  async searchGoogleShopping(query, limit = 10) {
    if (!this.apis.serpApi.enabled || !this.apis.serpApi.apiKey) {
      console.warn('SerpApi not configured');
      return [];
    }

    try {
      const response = await fetch(
        `${this.apis.serpApi.baseUrl}/search?engine=google_shopping&q=${encodeURIComponent(query)}&api_key=${this.apis.serpApi.apiKey}&num=${limit}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.shopping_results?.map(item => ({
        id: item.product_id || `google_${Date.now()}`,
        name: item.title || 'Unknown Product',
        brand: item.brand || 'Unknown Brand',
        category: item.categories?.[0] || 'Uncategorized',
        image: item.thumbnail,
        barcode: null,
        description: item.description || `Product: ${item.title}`,
        source: 'Google Shopping',
        apiSource: 'serpApi',
        price: item.price ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : null,
        currency: item.currency || 'USD',
        availability: item.availability || 'unknown',
        rating: item.rating ? parseFloat(item.rating) : null,
        reviews: item.reviews ? parseInt(item.reviews) : null,
        link: item.link
      })) || [];
    } catch (error) {
      console.error('Error searching Google Shopping:', error);
      return [];
    }
  }

  // Generic search method that tries multiple APIs
  async searchProducts(query, options = {}) {
    const {
      limit = 10,
      sources = ['openFoodFacts'],
      includePrices = false
    } = options;

    const results = [];
    const searchPromises = [];

    // Add search promises based on enabled sources
    if (sources.includes('openFoodFacts') && this.apis.openFoodFacts.enabled) {
      searchPromises.push(this.searchOpenFoodFacts(query, limit));
    }

    if (sources.includes('upcDatabase') && this.apis.upcDatabase.enabled) {
      searchPromises.push(this.searchUPCDatabase(query));
    }

    if (sources.includes('googleShopping') && this.apis.serpApi.enabled) {
      searchPromises.push(this.searchGoogleShopping(query, limit));
    }

    // Execute searches in parallel
    try {
      const searchResults = await Promise.allSettled(searchPromises);
      
      searchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.push(...result.value);
        } else {
          console.error(`Search API ${index} failed:`, result.reason);
        }
      });

      // Remove duplicates based on name and brand
      const uniqueResults = this.removeDuplicates(results);
      
      // Sort by relevance (name match, then rating)
      const sortedResults = this.sortByRelevance(uniqueResults, query);
      
      return sortedResults.slice(0, limit);
    } catch (error) {
      console.error('Error in product search:', error);
      return [];
    }
  }

  // Remove duplicate products
  removeDuplicates(products) {
    const seen = new Set();
    return products.filter(product => {
      const key = `${product.name.toLowerCase()}_${product.brand?.toLowerCase() || 'unknown'}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  // Sort products by relevance to query
  sortByRelevance(products, query) {
    const queryLower = query.toLowerCase();
    
    return products.sort((a, b) => {
      // Exact name match gets highest priority
      const aExactMatch = a.name.toLowerCase() === queryLower ? 1 : 0;
      const bExactMatch = b.name.toLowerCase() === queryLower ? 1 : 0;
      
      if (aExactMatch !== bExactMatch) {
        return bExactMatch - aExactMatch;
      }
      
      // Name contains query
      const aContains = a.name.toLowerCase().includes(queryLower) ? 1 : 0;
      const bContains = b.name.toLowerCase().includes(queryLower) ? 1 : 0;
      
      if (aContains !== bContains) {
        return bContains - aContains;
      }
      
      // Sort by rating if available
      if (a.rating !== null && b.rating !== null) {
        return b.rating - a.rating;
      }
      
      // Sort by availability
      const aAvailability = a.availability === 'available' ? 1 : 0;
      const bAvailability = b.availability === 'available' ? 1 : 0;
      
      if (aAvailability !== bAvailability) {
        return bAvailability - aAvailability;
      }
      
      // Finally sort by name
      return a.name.localeCompare(b.name);
    });
  }

  // Convert nutrition grade to rating (1-5 scale)
  convertNutritionGrade(grade) {
    const gradeMap = {
      'a': 5,
      'b': 4,
      'c': 3,
      'd': 2,
      'e': 1
    };
    return gradeMap[grade?.toLowerCase()] || 3;
  }

  // Get product details by barcode
  async getProductByBarcode(barcode) {
    try {
      // Try Open Food Facts first
      const response = await fetch(
        `${this.apis.openFoodFacts.baseUrl}/code/${barcode}?fields=product_name,brands,categories,image_front_url,ingredients_text,nutrition_grades`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.status === 1 && data.product) {
          const product = data.product;
          return [{
            id: barcode,
            name: product.product_name || 'Unknown Product',
            brand: product.brands || 'Unknown Brand',
            category: product.categories?.split(',')[0] || 'Uncategorized',
            image: product.image_front_url,
            barcode: barcode,
            description: product.ingredients_text || `Product: ${product.product_name}`,
            nutritionGrade: product.nutrition_grades,
            source: 'Open Food Facts',
            apiSource: 'openFoodFacts',
            price: null,
            currency: null,
            availability: 'unknown',
            rating: product.nutrition_grades ? this.convertNutritionGrade(product.nutrition_grades) : null
          }];
        }
      }
    } catch (error) {
      console.error('Error getting product by barcode:', error);
    }
    
    return [];
  }

  // Configure API keys
  configureAPI(apiName, apiKey) {
    if (this.apis[apiName]) {
      this.apis[apiName].apiKey = apiKey;
      this.apis[apiName].enabled = !!apiKey;
      console.log(`${apiName} API configured successfully`);
    } else {
      console.error(`Unknown API: ${apiName}`);
    }
  }

  // Get API status
  getAPIStatus() {
    return Object.entries(this.apis).reduce((status, [name, config]) => {
      status[name] = {
        enabled: config.enabled,
        hasApiKey: !!config.apiKey
      };
      return status;
    }, {});
  }

  // Enhanced search with category filtering
  async searchByCategory(category, limit = 20) {
    try {
      const response = await fetch(
        `${this.apis.openFoodFacts.baseUrl}/search?categories=${encodeURIComponent(category)}&page_size=${limit}&fields=product_name,brands,categories,image_front_url,code,nutrition_grades`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.products?.map(product => ({
        id: product.code,
        name: product.product_name || product.product_name_en || 'Unknown Product',
        brand: product.brands || 'Unknown Brand',
        category: product.categories?.split(',')[0] || 'Uncategorized',
        image: product.image_front_url,
        barcode: product.code,
        description: `Category: ${category}`,
        nutritionGrade: product.nutrition_grades,
        source: 'Open Food Facts',
        apiSource: 'openFoodFacts',
        price: null,
        currency: null,
        availability: 'unknown',
        rating: product.nutrition_grades ? this.convertNutritionGrade(product.nutrition_grades) : null
      })) || [];
    } catch (error) {
      console.error('Error searching by category:', error);
      return [];
    }
  }
}

// Create singleton instance
export const externalProductAPI = new ExternalProductAPI();

export default externalProductAPI;
