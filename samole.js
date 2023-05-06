<SafeAreaView>
<Text style={styles.value}>
  {parseFloat(state.currentValue).toLocaleString()}
</Text>

{/* Do create componentRow */}
<Row>
  <Button
    text="C"
    theme="secondary"
    onPress={() => HandleTap("clear")}
  />

 

  <Button
    text="%"
    theme="secondary"
    onPress={() => HandleTap("percentage")}
  />

  <Button
    text="/"
    theme="secondary"
    onPress={() => HandleTap("operator", "/")}
  />
  <Button
    text="X"
    theme="accent"
    onPress={() => HandleTap("operator", "*")}
  />
</Row>

{/* Number */}
<Row>
  <Button text="7" onPress={() => HandleTap("number", 7)} />
  <Button text="8" onPress={() => HandleTap("number", 8)} />
  <Button text="9" onPress={() => HandleTap("number", 9)} />
  <Button
    text="-"
    theme="accent"
    onPress={() => HandleTap("operator", "-")}
  />
</Row>

<Row>
  <Button text="4" onPress={() => HandleTap("number", 4)} />
  <Button text="5" onPress={() => HandleTap("number", 5)} />
  <Button text="6" onPress={() => HandleTap("number", 6)} />
  <Button
    text="+"
    theme="accent"
    onPress={() => HandleTap("operator", "+")}
  />
</Row>

<Row>
  <Button text="1" onPress={() => HandleTap("number", 1)} />
  <Button text="2" onPress={() => HandleTap("number", 2)} />
  <Button text="3" onPress={() => HandleTap("number", 3)} />
  <Button
    text="="
    theme="primary"
    onPress={() => HandleTap("equal", "=")}
  />
</Row>

<Row>
  <Button text="0" onPress={() => HandleTap("number", 0)} />
  <Button text="." onPress={() => HandleTap("number", ".")} />
  <Button
    text="Next"
    theme="greenish"
    
    onPress={() => {
      switch (selected) {
        case "Bags":
         
          setBags(state.currentValue)
          Handlenext('next')
          return setSelected('Weight')

        case "Weight":
          setWeight(state.currentValue)
          Handlenext('next')
          return setSelected('Ot')
        case "Ot":
          setOt(state.currentValue)
          Handlenext('next')
          return setSelected('Moisture')
        case "Moisture":
          setMc(state.currentValue)
          Handlenext('next')
          return setSelected('Finalot')
        case "Finalot":
            setFinalot(state.currentValue)
            Handlenext('next')
            return setSelected('Bagprice');
        case "Bagprice":
            setPerbag(state.currentValue)
            Handlenext('next')
            return setSelected('Bags')
        
        default:
          Handlenext('next')
          return setSelected('bree');
        
      }
      }
    }
  />
</Row>
</SafeAreaView>
