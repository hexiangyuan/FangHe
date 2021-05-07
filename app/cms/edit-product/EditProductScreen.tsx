import { useRoute } from "@react-navigation/native";
/**
 * 编辑物品
 * @returns React.FC
 */

type NewEditProductScreenParams = {
  shopId: number;
  productId: number;
};

export function EditProductScreen(): React.FC<{}> {
  const params: NewEditProductScreenParams = useRoute().params;

  return null;
}
