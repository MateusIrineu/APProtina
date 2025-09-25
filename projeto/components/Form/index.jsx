import{View, Text, TextInput, Pressable, Animated} from 'react-native'
import styles from './style'
import { useRef, useState, useEffect } from 'react'
import ResultIMC from './ResultImc';


export default function Form(){
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState('Preencha o peso e altura');
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState('Calcular');

    // inicio da animação
    const slideAnim = useRef(new Animated.Value(100)).current //slide para cima
    const fadeAnim = useRef(new Animated.Value(0)).current // começo invisível

    //executa animaçaõ
    useEffect(() =>{
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDrive: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDrive: true
            }).start()
        }, [slideAnim, fadeAnim])
    

    //função calcular IMC
    function imcCalculator(){
        const heightNum = parseFloat(height);
        const weightNum = parseFloat(weight);
        return (weightNum/(heightNum * heightNum)).toFixed(2);
    }

    //função de validação
    function validationImc(){
        if(weight != null && height != null){
            const calculatedImc = imcCalculator()
            setImc(calculatedImc)
            setHeight(null)
            setWeight(null)
            setMessageImc('Seu IMC é igual:')
            setTextButton('Calcular Novamente')
            return
        }
        setImc(null)
        setTextButton('calcular o IMC')
        setMessageImc('Preencha o peso e altura')
    }



    return(
        <Animated.View
            styles={[
                styles.formContainer, {
                    opacity: fadeAnim,
                    transform: [{
                        translateY: slideAnim
                    }]
                }               
            ]}
        >
            <View style={styles.form}>
                <Text style={styles.label}>Altura (m)</Text>
                <TextInput style={styles.input} onChangeText={setHeight} value={height}
                placeholder='Ex. 1.75'  keyboardType='numeric' />

                <Text style={styles.label}>Peso (kg)</Text>
                <TextInput style={styles.input} onChangeText={setWeight} value={weight} placeholder='Ex. 80' keyboardType='numeric'/>

                <Pressable style={styles.buttonCalculator} onPress={() => validationImc()}>
                    <Text style={styles.buttonCalculatorText}>{textButton}</Text>
                </Pressable>

                <ResultIMC messageResultImc={messageImc} resultIMC={imc} />
            </View>
        </Animated.View>
    )
}