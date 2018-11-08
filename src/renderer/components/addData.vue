<template>
	<div>
		<button @click="dis=1">添加</button>
		<ul v-if="dis">
			<li>名字：<input type="text" v-model="d.name"></li>
			<li>描述：<input type="text" v-model="d.name"></li>
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
				msg: ''
			},
			list: []
		}
	},
	created () {
		// 检测创建
		this.$fs.stat(this.$path + 'list', (err, status) => {
			if (err) {
				this.$fs.mkdir(this.$path + 'list', e => {
					if (e) {
						this.$api.msg('创建list目录失败！')
					} else {
						this.$fs.writeFile(this.$path + 'list/list.json', '', e => {})
					}
				})
				this.$fs.mkdir(this.$path + 'list/copy', e => {
					if (e) {
						this.$api.msg('创建list/copy目录失败！')
					}
				})
			} else {
				this.$fs.readFile(this.$path + 'list/list.json', 'utf-8', (e, d) => {
					if (!e) {
						if (d) {
							this.list = JSON.parse(d)
						}
					}
				})
			}
		})
	},
	methods: {
		add () {
			if (this.d.name) {
				this.$fs.writeFile(this.$path + 'list/copy/list.json', JSON.stringify(this.list), e => {}) // 备份
				this.list.push(this.d)
				this.$fs.writeFile(this.$path + 'list/list.json', JSON.stringify(this.list), e => {
					if (e) {
						this.$api.msg('添加失败！')
					} else {
						this.$api.msg('添加成功！')
					}
				})
			} else {
				this.$api.msg('请输入数据！')
			}
		}
	}
}
</script>