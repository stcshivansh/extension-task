
export const checkoutService = async(id)=>{
    try {
    const query = `
      query ShopName($id: ID!) {
        customer(id: $id) {
          addresses(first: 10) {
            address1
            address2
            city
            phone
            name
            company
            country
            firstName
            lastName
            id
            province
            zip
            countryCodeV2
          }
        }
      }
    `
    const result = await apiConnector('POST',{
      query,variables:{
        id
      }
    });
    return result;
    } catch (error) {
        throw new Error(error)
    }
}