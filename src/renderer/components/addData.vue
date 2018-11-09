<template>
	<div>
		<button @click="dis=1">添加</button>
		<ul v-if="dis">
			<li>name:<input type="text" v-model="d.name"></li>
			<li>msg：<input type="text" v-model="d.msg"></li>
			<li>img：<input type="text" v-model="d.img"></li>
			<li>status：<input type="text" v-model="d.status"></li>
			<li><button @click="add">完成</button></li>
		</ul>
	</div>
</template>

<script>
export default {
	data () {
		return {
			dis: 0,
			d: {
				name: '',
				msg: '',
				img: '',
				status: '', // 状态： 未看 已看
				time: '',
				type: '1'
			},
			list: []
		}
	},
	created () {
	},
	methods: {
		add () {
			if (this.d.name) {
				let time = Date.now()
				this.d.time = time
				this.id = time
				this.$fs.writeFile(this.$path + 'list/' + time + '.json', JSON.stringify(this.d), e => {
					if (e) {
						this.$api.msg('添加失败！')
					} else {
						this.$api.msg('添加成功！')
						this.copy()
					}
				})
			} else {
				this.$api.msg('请输入数据！')
			}
		},
		copy () {
			let list = []
			this.$fs.readdir(this.$path + 'list', (e, d) => {
				if (!e) {
					d.forEach(j => {
						this.$fs.readFile(this.$path + 'list/' + j, 'utf-8', (e, d) => {
							if (d) {
								list.push(JSON.parse(d))
							}
						})
					})
					setTimeout(e => {
						this.$fs.writeFile(this.$path + 'copy/' + Date.now() + '.json', JSON.stringify(list), e => {})
					}, 1000)
				}
			})
		}
	}
}
</script>