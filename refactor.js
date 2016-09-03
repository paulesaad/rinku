
//{width: width/3*.7, height: width/3*.7}


var params=['email', 'phone', 'linkedin', 'facebook', 'twitter', 'skype', 'instagram',  'github', 'site']

params.map(v, i) => {	
	return <TouchableWithoutFeedback onPress={this._toggle.bind(this, [`bool_${v}`, v])}>
		<View style={styles.tile}>
			<View style={[styles.backgroundImage, this.state[`bool_${v}`] && styles.selected]}>
				<Image 
					style={[styles.tileImage, this.state[`bool_${v}`] && styles.highlight]} 
					source={require(`image!${v}`)}
				/>
			</View>
		</View>
	</TouchableWithoutFeedback>
})

for (row in options){
	console.log(row)
}
<View style={styles.tileRow}>
	
</View>
<View style={styles.tileRow}>
	
</View>
<View style={styles.tileRow}>
	
</View>