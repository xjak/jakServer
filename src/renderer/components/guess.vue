<template>
	<div class="guess" ref="www" :style="{top: y, left: x}" v-show="list[0]">
		<ul>
			<li v-for="i in list" @click="callBack(i)">{{i}}</li>
		</ul>
	</div>
</template>

<script>
export default {
	data () {
		return {
			list: [],
			x: 0,
			y: 0,
			flag: 1
		}
	},
	props: ['text'],
	mounted () {
		let inp = this.$refs.www.parentElement.querySelector('input')
		this.y = inp.offsetHeight + inp.offsetTop + 3 + 'px'
		this.x = inp.offsetLeft + 2 + 'px'
		document.body.onclick = () => {
			setTimeout(() => {
				this.list = []
			}, 50)
		}
	},
	watch: {
		text () {
			if (this.flag && this.text) {
				this.searchChange()
			} else {
				this.list = []
			}
		}
	},
	methods: {
		searchChange () {
			this.$axios.get('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=show&wd=' + this.text)
			.then(d => {
				this.list = d.data.split('s:[')[1].replace(']});', '').split(',').map(a => {
					return a.replace(/"/g, '')
				})
			})
		},
		callBack (v) {
			this.flag = 0
			this.list = []
			this.$emit('select', v)
			setTimeout(e => {
				this.flag = 1
			}, 1000)
		}
	}
}
</script>

<style lang="scss">
.guess{
	background: #fff;
	font-size: 14px;
	padding: 5px 10px 5px 3px;
	position: absolute;
	left: 1px;
	ul{
		width: auto;
		li{
			padding-top: 3px;
			cursor: pointer;
			transition: all .1s;
		}
		li:hover{
			background: #ccc;
		}
	}
}
</style>