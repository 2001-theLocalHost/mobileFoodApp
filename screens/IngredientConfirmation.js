import React from 'react'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Picker } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { addIngredientByUser, finalizeIngredients, fetchNutrition, removeIngredient, removeUserAddedItem } from '../redux/dishes'
//import { Redirect } from 'react-router';

class IngredientConfirmation extends React.Component {
    constructor() {
        super()
        this.state = {value: '', portion: "", amount: '', type: '', ingredients: [{name: "", quantity: 0, measurement: "oz"}]}
        this.handleChangeText = this.handleChangeText.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fetchNutrition = this.fetchNutrition.bind(this)
        this.removeIngredient = this.removeIngredient.bind(this)
        this.removeUserAddedItem = this.removeUserAddedItem.bind(this)
    }

    componentDidMount () {
        this.setState({...this.state, ingredients: this.props.ingredients}, () => { console.log('TEST', this.state.ingredients); return true})
        //console.log('TEST', this.state.ingredients)
    }

    handleChangeText(newText) {
        this.setState({value: newText})
    }

    handleSubmit() {
        this.props.addIngredientByUser(this.state.value)
        this.setState({value: ''})
    }

     async fetchNutrition () {
        //console.log('DID THIS HAPPEN?', 'API INGREDIENTS: ', this.props.ingredients, 'USER INGREDIENTS: ', this.props.userAddedIngredients)
        await this.props.finalizeIngredients(this.props.ingredients, this.props.userAddedIngredients)
        console.log('API INGREDIENTS: ', this.props.ingredients, 'USER INGREDIENTS: ', this.props.userAddedIngredients, 'Final Ingredients look like this: ', this.props.finalIngredients)
        // await this.props.fetchNutrition(this.props.finalIngredients)
        // console.log('Final Ingredients look like this: ', this.props.finalIngredients)
        // if(this.props.nutritionData === true){
        //     return (<Redirect to="/your/redirect/page" />);
        // }
    }

    async removeIngredient (index) {
        this.props.removeIngredient(index)
    }

    async removeUserAddedItem (index) {
        this.props.removeUserAddedItem(index)
    }

    render() {
        const ingredients = this.props.ingredients
        console.log('****', ingredients)
        const userAddedIngredients = this.props.userAddedIngredients
        const quantTypes = [{value: 'oz'}, {value: 'g'}, {value: 'c'}]
        return (
            <View>
                <View style={styles.renderIngredients}>
                <Text>Confirm Your Ingredients:</Text>
                {
                 this.state.ingredients.map((item, index) => {
                         return (
                             <Text key={index}>
                             <Text >
                                 {item.name} 
                             </Text>
                             <Button onPress={this.removeIngredient} title="Remove" color="red" />
                             <TextInput 
                                placeholder="Enter A Numerical Value"
                                defaultValue={item.quantity} 
                            />
                            <Text></Text>
                            <Picker
                            selectedValue={item.measurement}>
                            {/* onValueChange={(value) => { 
                                let localState = {...this.state}
                                this.setState({...this.state, this.state.ingredients[index].measurement: value})} } */}
                                {
                                    quantTypes.map((cateogry, index) => {
                                        return (<Picker.Item key={index} label={cateogry.value} value={cateogry.value}/>)
                                    })
                                }
                            </Picker>
                             </Text>
                         )
                     })
                }
                </View>

                <View style={styles.renderIngredients}>
                <Text>Added By User:</Text>
                {
                    userAddedIngredients.map((item, index) => {
                         return (
                             <Text key={index}>
                             <Text>
                                 {item} 
                             </Text> 
                             <Button onPress={this.removeUserAddedItem} title="Remove" color="red" /> 
                             <TextInput 
                                placeholder="Enter A Numerical Value"
                                defaultValue={this.state.portion} 
                            />
                            <Picker>
                                {
                                    quantTypes.map((cateogry, index) => {
                                        return (<Picker.Item key={index} label={cateogry.value} value={cateogry.value} />)
                                    })
                                }
                            </Picker>  
                             </Text>
                         )
                     })
                }
                </View>
            
                <View style={styles.addItem}>
                <Text>Add An Additional Ingredient:</Text>
                <TextInput 
                    placeholder='Your Ingredient' 
                    defaultValue={this.state.value}
                    onChangeText={this.handleChangeText} 
                />
                <Button onPress={this.handleSubmit} title="Add" color="#00B0FF" />
                </View>

                <View style={styles.addItem}>
                <Text>Confirm Portion Size:</Text>
                <TextInput 
                    placeholder=""
                    defaultValue={this.state.portion} 
                />
                </View>

                <View style={styles.addItem}>
                <Button onPress={this.fetchNutrition} title="All Set! Get Me Nutritional Information" color="green" />
                </View>
         
            </View>
        )
    }
}

const mapState = (state) => {
    return {
        ingredients: state.dishes.ingredients,
        userAddedIngredients: state.dishes.userAddedIngredients,
        finalIngredients: state.dishes.finalIngredients,
        nutritionData: state.dishes.nutritionData
    }
}

const mapDispatch = (dispatch) => {
    return {
        addIngredientByUser: (newIngredient) => dispatch(addIngredientByUser(newIngredient)),
        finalizeIngredients: (ingredients, userIngredients) => dispatch(finalizeIngredients(ingredients, userIngredients)),
        fetchNutrition: (finalIngredients) => dispatch(fetchNutrition(finalIngredients)),
        removeIngredient: (index) => dispatch(removeIngredient(index)),
        removeUserAddedItem: (index) => dispatch(removeUserAddedItem(index))
    }
}

export default connect(mapState, mapDispatch)(IngredientConfirmation)


const styles = StyleSheet.create({
    addItem: {
        padding: 10
    },
    renderIngredients: {
        padding: 10
    },
})