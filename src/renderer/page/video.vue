<template>
	<div class="video">
		<button class="button" @click="type=1">add</button>
		<button class="button2" @click="type=2">search</button>
		<addData v-if="type==1"></addData>
		<list v-if="type==2"></list>
	</div>
</template>

<script>
import addData from '../components/addData'
import list from '../components/list'
export default{
	components: {
		addData,
		list
	},
	data () {
		return {
			type: 0
		}
	},
	methods: {
	}
}
</script>

<style lang="scss">
.video{
	padding-top: 10px;
}	
</style>