import {FangHeApi} from "../../services/api";

function getHomeList(request: {
  id: number;
  location: {
    latitude: number;
    longitude: number;
  };
  page: number;
  pagesize: number;
}) {
  return FangHeApi.post("/home/shop/list", request);
}

function shopDetail(id: number) {
  return FangHeApi.get("/shop/detail", {id: id});
}

function shopDetailProductList(id: number) {
  return FangHeApi.get("/shop/product/list", {shopId: id});
}

function productDetail(id: number) {
  return FangHeApi.post("/product/detail?id=5", {id: id});
}

function orderSubmit(request: { productId: number; quantity: number; time: string }) {
  return FangHeApi.post("/order/create", request);
}

function getFindArticleList() {
  return FangHeApi.test("{\n" +
    "\"code\":200,\n" +
    "    \"data\":[\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"这是标题，文章标题，大大的标题嫩嗯嗯呢呢呢…这是标题，文章标题\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"icon\":\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b\",\n" +
    "            \"title\":\"电脑\",\n" +
    "            \"key\":\"1\",\n" +
    "            \"price\": \"20\"\n" +
    "        }\n" +
    "\n" +
    "\n" +
    "        \n" +
    "    ]\n" +
    "}")
}

function getVerificationCode(mobile: string) {
  return FangHeApi.get("/common/verification-code", {mobile: mobile});
}

function loginMobile(request: { mobile: string; verificationCode: string }) {
  return FangHeApi.post("/login/mobile", request);
}

function orderList(page: number) {
  return FangHeApi.get("/order/list", {
    pageSize: 20,
    page: page
  });
}

function pictureUpload(file: { uri: string; name: string; type: string }) {
  const body = new FormData();
  console.log(file);
  body.append("file", file);
  body.append("fileName", file.name + ".jpg");
  return FangHeApi.post("/picture/upload", body);
}

const HomeApi = {
  getHomeList,
  shopDetail,
  shopDetailProductList,
  productDetail,
  orderSubmit,
  getFindArticleList,
  getVerificationCode,
  loginMobile,
  orderList,
  pictureUpload
};

export default HomeApi;
