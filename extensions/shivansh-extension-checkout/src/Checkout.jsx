import {
  Modal,
  reactExtension,
  BlockStack,
  Text,
  Button,
  useApplyShippingAddressChange,
  useApi,
  useTotalAmount,
  useBuyerJourneyIntercept
} from "@shopify/ui-extensions-react/checkout";
import { useEffect, useState } from "react";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));
export const checkoutAfter = reactExtension(
  "purchase.checkout.cart-line-list.render-after",
  () => (
    <BlockStack spacing="loose">
      <Text>This shows below the shipping address form</Text>
    </BlockStack>
  )
);

function Extension() {
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([]);

  const applyShippingAddressChange = useApplyShippingAddressChange();
  const total = useTotalAmount()
  console.log(total?.amount)
  const { extension ,ui} = useApi();

  const fullUrl = extension?.scriptUrl;
  const origin = fullUrl ? new URL(fullUrl).origin : "";

  const handleSelect = async (address) => {
    setSelected(address);
    await applyShippingAddressChange({
      type: "updateShippingAddress",
      address: {
        ...address,
        countryCode: address.countryCodeV2,
      },
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${origin}/api/extensions/getAddresses`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            id: "gid://shopify/Customer/9357968671004"
          },
        });
        const result = await res.json();
        console.log(result)
        if (result.success) {
          setData(result.data);
        }
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    })();
  }, [origin]);
   useBuyerJourneyIntercept(
    () => {
      return total?.amount &&
        total?.amount <500
        ? {
            behavior: 'block',
            reason: 'Invalid Order amount',
            errors: [
              {
                message:
                  'Order must be greator than 500',
              }
            ],
          }
        : {
            behavior: 'allow',
          };
    },
  );

  return (
    <BlockStack spacing="loose">

      <Text>Custom Address Selector</Text>
      {data.length > 5 && (
        <Button
          overlay={
            <Modal padding title="Select Address" id="modal">
              <BlockStack spacing="tight">
                {data.slice(5).map((addr, idx) => (
                  <Button
                    key={idx}
                    onPress={() =>{
                       handleSelect(addr);
                       ui.overlay.close('modal')
                    }}
                    kind={selected?.id === addr.id ? "primary" : "secondary"}
                  >
                    {addr.name} — {addr.address1}, {addr.city}
                  </Button>
                ))}
              </BlockStack>
            </Modal>
          }
        >
          Select Address
        </Button>
      )}
    </BlockStack>
  );
}
