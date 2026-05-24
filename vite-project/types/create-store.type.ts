export interface setFormDataT {
  name: string,
  type: string,
  description: string,
  businessInfo: {
      businessName: string,
      businessType: string,
      registrationNumber: string,
      taxId: string,
      businessLicense: string,
      vatNumber: string,
      website: string,
      email: string,
      phone: string
  },
      address: {
      street: string,
      city: string,
      state: string,
      country: string,
      zipCode: string
    },
    createdBy: string,
    location: {
      name: string,
      description: string,
      area: number,
      seatingCapacity: number,
      parkingSpaces: number,
      hasStorage: boolean,
      hasDeliveryService: boolean,
      operatingHours: {
        monday: { open: string, close: string },
        tuesday: { open: string, close: string },
        wednesday: { open: string, close: string },
        thursday: { open: string, close: string },
        friday: { open: string, close: string},
        saturday: { open: string, close: string},
        sunday: { open: string, close: string}
      }
    },
    settings: {
      currency: string,
      timezone: string,
      dateFormat: string
    }
}