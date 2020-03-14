import React, {useEffect, useState, useLayoutEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import axios from 'axios';
// components
import Preloader from 'src/components/Preloader';
import AnswerItem from 'src/components/AnswerItem';
import HeaderBuckButton from '@react-navigation/stack/src/views/Header/HeaderBackButton';

const QuestionsListScreen = ({navigation, route}) => {
  const [question, setQuestion] = useState();
  const [loading, load] = useState(true);
  const [closing, closeNumbers] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({label, onPress, tintColor}) => {
        return (
          <HeaderBuckButton
            {...{
              label,
              onPress: () => {
                setTimeout(onPress, 400);
                closeNumbers(true);
              },
              tintColor,
            }}
          />
        );
      },
    });
  }, [navigation, closeNumbers]);

  const getQuestion = async url => {
    load(true);
    try {
      const {data} = await axios.get(url);
      setQuestion(data);
    } catch (err) {
      console.log(err);
    }
    load(false);
  };

  useEffect(() => {
    getQuestion(route.params?.url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAnswer = item => (
    <AnswerItem
      key={item.number}
      answer={item.answer}
      number={String(item.number)}
      close={closing}
    />
  );

  return loading ? (
    <Preloader />
  ) : question ? (
    <View style={styles.main}>
      <Text style={styles.question}>{question.question}</Text>
      {question.answers.map(renderAnswer)}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
  },
});

export default QuestionsListScreen;
