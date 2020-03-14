import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Alert} from 'react-native';
import * as Api from 'src/core/api';
// components
import QuestionItem from 'src/components/QuestionItem';
import BottomMenu from 'src/components/BottomMenu';
// store
// import {Context} from 'src/store';

const QuestionsListScreen = ({navigation}) => {
  // const {dispatch} = useContext(Context);
  const [list, setList] = useState();
  const [loading, load] = useState(true);

  // Usually I implements server handling with redux
  const getQuestionsList = async () => {
    load(true);
    try {
      const {data} = await Api.getQuestionsList();
      let qList =
        data.length > 0
          ? data.sort((a, b) => String(b.url).length - String(a.url).length)
          : [];
      setList(qList);
    } catch (err) {
      console.log(err);
    }
    load(false);
  };

  useEffect(() => {
    getQuestionsList();
  }, []);

  const onPressQuestion = url => {
    if (url) {
      navigation.push('Question', {url});
    } else {
      Alert.alert('Вопрос не имеет вариантов ответов.');
    }
  };

  const renderQuestion = ({item}) => (
    <QuestionItem
      title={item.title}
      url={item.url}
      onPress={() => onPressQuestion(item.url)}
    />
  );

  return (
    <View style={styles.main}>
      <FlatList
        data={list}
        renderItem={renderQuestion}
        keyExtractor={item => item.title}
        refreshing={loading}
        onRefresh={() => getQuestionsList()}
      />
      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'transparent',
    flex: 1,
  },
});

export default QuestionsListScreen;
