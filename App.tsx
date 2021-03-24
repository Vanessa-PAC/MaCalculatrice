import React, { useState } from "react";
import { Button, View, Text,TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation } : {navigation: any}) {
  const [resultText, setResultText] = useState("");
  const [formula, setFormula] = useState("");
  const buttons = [1, 2, 3, 4, 5, 6,7, 8, 9, 0];
  const [list, setList] = useState([""]);

  // Quand je clique sur "=", il m'affiche le résultat
  const onButtonClick = (text: string | number) => {
    if (text == "=") {
      return calculateResult();
    }
    setFormula(formula + text);
  };

  // l'opération "+"
  const calculateResult = () => {
    setFormula(eval(formula));
    console.log(formula)
  };

  // + et CLEAR
  const onOperationClick = (operation: string) => {
    let operations = ["CLEAR"];

    // effacer
    if (operation == "CLEAR") {
      return setFormula(formula.toString().substring(0, formula.length - 10));
    }

    if (operations.includes(formula.toString().split("").pop())) return;
    setFormula(formula + operation);
  };

  function addToList(calcText: string) {
    calculateResult();
    list.push(calcText);
  }
  console.log(list);

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.resultText}>{formula}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.numbers}>
          <View style={styles.row}>
            {buttons.map((buttons) =>{
              return (
                  <TouchableOpacity
                  style={styles.number}
                    onPress={() => {
                      onButtonClick(buttons);
                    }}
                  >
                    {buttons}
                  </TouchableOpacity>
                
              );
            })}
         </View>

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                onButtonClick("=");
                addToList(formula);
              }}
              style={styles.btn}
            >
              <Text style={styles.number}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.operations}>
          <TouchableOpacity
            onPress={() => onOperationClick("CLEAR")}
            style={styles.btn}
          >
            <Text style={styles.operationButton}>CLEAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onOperationClick("+")}
            style={styles.btn}
          >
            <Text style={styles.operationButton}>+</Text>
          </TouchableOpacity>
        </View>
        
        
      </View>
      <Button
        color="black"
        title="Les derniers calculs"
        onPress={() => navigation.navigate('Historique', { list: {list}})}
        /> 
    </View>
  );
}

function HistoryScreen({route, navigation} : {navigation: any,route : any})  {
  const { list } = route.params.list;
  console.log(list)
  return (
    
      <View style={styles.result}>
        <Text style={styles.resultText}>Derniers résultats :</Text>
        {list.length == 1 && (
          <Text style={styles.resultText}>Aucun résultat</Text>
        )}
        {list.map((formula: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) => (
          <Text style={styles.resultText}>{formula}</Text>
        ))}
      <Button color= "black" title="Go to Home" onPress={() => navigation.navigate('Home')} />
      </View>
 
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Historique" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result: {
    flex: 2,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  resultText: {
    fontSize: 30,
    color: "white",
  },
  calculationText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  number: {
    fontSize: 30,
    color: "white",
  },
  calculation: {
    flex: 1,
    backgroundColor: "#d6d6c2",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    fontSize: "30",
  },
  buttons: {
    flex: 4,
    flexDirection: "row",
  },
  numbers: {
    flex: 3,
    backgroundColor: "#434343",
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  operations: {
    flex: 1,
    backgroundColor: "#636363",
    alignItems: "center",
    justifyContent: "space-around",
  },
  operationButton: {
    fontSize: 30,
    color: "white",
  },
});

export default App;
