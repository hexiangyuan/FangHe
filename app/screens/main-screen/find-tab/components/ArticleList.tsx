import React, {useEffect} from "react";
import {FlatList, RefreshControl, TouchableOpacity, View} from "react-native";
import {ArticleItem} from "./ArticleItem";
import {RootNavigation} from "../../../../navigation";
import HomeApi from "../../HomeApi";
import {observer, useLocalStore} from "mobx-react-lite";
import {EmptyView} from "./EmptyView";
import {getLocation} from "../../../../models/location-store/LocationStore";

export interface Props {
  key: "100" | "200";
}

const keyTabArticle = "30";
const keyTabPhoto = "40";
const keyTabVideo = "50";

export const ArticleList = observer((props: { type: string }) => {
  const store = useLocalStore(() => ({
    data: undefined,
    refreshing: false,
    get empty() {
      if (store.data) {
        return store.data.length === 0;
      } else {
        return false;
      }
    },
    refreshData() {
      store.refreshing = true;
      // HomeApi.getFindArticleList().then(value => {
      //   store.refreshing = false;
      //   if (value.code === 200) {
      //     store.data = value.data;
      //   }
      // });
      getLocation()
        .then(location => {
          HomeApi.getFindArticleList().then(value => {
            store.refreshing = false;
            console.log("response data==== ", value.code);
            if (value.code === 200) {
              store.data = value.data;
            }
          });
        })
        .catch(e => {
          store.refreshing = false;
          console.log(e);
        });
    }
  }));

  function onRefresh() {
    store.refreshData();
  }

  useEffect(() => {
    store.refreshData();
  }, []);

  if (store.empty) {
    return <EmptyView onPress={store.refreshData}/>;
  } else {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <FlatList
          style={{flex: 1, paddingRight: 12}}
          data={store.data}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={<RefreshControl refreshing={store.refreshing} onRefresh={onRefresh}/>}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  switch (props.type) {
                    case keyTabArticle:
                      RootNavigation.push("ArticleDetailScreen", {id: item.id});
                      break
                    case keyTabPhoto:
                      RootNavigation.push("PhotoDetailScreen", {id: item.id});
                      break
                    case keyTabVideo:
                      RootNavigation.push("VideoDetailScreen", {id: item.id});
                      break
                  }
                }}
                style={{flex: 1}}
              >
                <ArticleItem {...item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
});
