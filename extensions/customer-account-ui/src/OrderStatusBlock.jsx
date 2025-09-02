import {
  BlockStack,
  reactExtension,
  TextBlock,
  Banner,
  Image,
  View,
  ResourceItem,InlineStack,
  useApi,Button, Link 
} from "@shopify/ui-extensions-react/customer-account";

import { useEffect, useRef, useState } from "react";
export default reactExtension(
  "customer-account.page.render",
  () => <PromotionBanner />
);

function PromotionBanner() {
  const { extension,navigation, ui, authenticatedAccount } = useApi();
  const [data, setData] = useState([]);
  //used to store backend url
  const origin = useRef("");

  //customer Id
  const id = useRef(null);


  // used to delete only specific product
  const deleteHandler =async(productId)=>{
    setData(data.filter((item)=>item.id!=productId))
    try {
        ui.toast.show("Wishlist Deleted Successfully")
        const res = await fetch(`${origin.current}/api/extensions/wishlist/removeProducts`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id.current,        // customer id
            productId    // product id (make sure this comes from the item in your map)
          }),
        });
        const result = await res.json();
        if (result.success) {
          
          console.log(result.message)
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
      finally{
        fetchData()
      }
    }
  //used to delete all the products
  const removeAllHandler = async()=>{
    try {
        ui.toast.show("All Wishlists Deleted Successfully")
        
        const res = await fetch(`${origin.current}/api/extensions/wishlist/removeAllProducts`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id.current,        // customer id
          }),
        });
        fetchData()
        const result = await res.json();
        if (result.success) {
          console.log(result.message)
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }


  }
  //to navigate to the respective product
  const goToHandler = (handle)=>{
    const link = "https://test-store0077.myshopify.com/products/"+handle
    navigation.navigate(link)
  }
  const fetchData =async()=>{
    try {
        const res = await fetch(`${origin.current}/api/extensions/wishlist/listProducts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            id: id.current 
          },
        });
        const result = await res.json();
        console.log("Result is ",result);
        if (result.success) {
          if(result?.products?.length==0)result.data.reverse()
          else
          setData(result.data);
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
  }
  useEffect(() => {
    const fullUrl = extension?.scriptUrl;
    origin.current = fullUrl ? new URL(fullUrl).origin : "";

    let customerId = authenticatedAccount?.customer?.current?.id;
    if (customerId && !customerId.startsWith("gid://shopify/Customer/")) {
      customerId = "gid://shopify/Customer/" + customerId;
    }
    id.current = customerId;
    // let int = setInterval(() => {
    //   fetchData()
    // }, 3000);
    // return ()=>clearInterval(int)
  }, [extension, authenticatedAccount]);

  useEffect(() => {
    fetchData()
  }, []);
  useEffect(()=>{
    console.log(data)
  },[data])
  return (
      <BlockStack >
        {
          (data?.length==0 || data?.products?.length!=0)&&  
          <InlineStack>
            <Button onPress={() =>removeAllHandler()}>Clear Wishlist</Button>
          </InlineStack>
        }
        {data?.products?.length === 0 ? (
          <TextBlock>No wishlist items yet.</TextBlock>
        ) : (<InlineStack >{ 
          data.map((item) => (
            <View maxInlineSize={350} key={item.id} display="block" inlineSize="fill">
        
          <ResourceItem
            accessibilityLabel="Resource Item"
            onPress={() => {}}
            actionLabel="Manage"
            action={
              <>
 
                <Button
                  kind="primary"
                  onPress={() =>goToHandler(item.handle)}
                >
                  Go To Product
                </Button>
                <Button
                  
                  onPress={() => deleteHandler(item.id)}
                >
                  Remove
                </Button>
              </>
            }
          >
            <Image aspectRatio="1"  source={item.image || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}/>
            <TextBlock>{item.title}  </TextBlock>
            <TextBlock>{item.amount}  </TextBlock>
          </ResourceItem>
            </View>
            
          ))
          
        }</InlineStack>)}
      </BlockStack>
  );
}
