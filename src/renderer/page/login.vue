<template>
	<div class="login" @keydown="enter($event)">
		<p>{{phrase}}</p>
		<div v-if="!json.password">
			<label>初始化密码：</label>
			<input type="password" v-model="password">
		</div>
		<div v-else>
			<label>密码：</label>
			<input type="password" v-model="password">
		</div>
		<button @click="login">提交</button>
	</div>
</template>

<script>
export default {
	// 动态背景
	data () {
		return {
			phrase: '',
			json: {},
			password: ''
		}
	},
	created () {
		// 判断配置文件
		this.$fs.readFile(this.$path + 'config.json', 'utf-8', (e, d) => {
			if (e) {
				this.$api.msg('无配置文件')
				// 检测data目录
				this.$fs.stat(this.$path, (err, status) => {
					if (err) {
						console.log(err)
						this.$fs.mkdir(this.$path, e => {
							if (e) {
								this.$api.msg('创建data目录失败！')
							}
						})
					}
				})
				// 创建list
				this.$fs.stat(this.$path + 'list', (err, status) => {
					if (err) {
						this.$fs.mkdir(this.$path + 'list', e => {
							if (e) {
								this.$api.msg('创建list目录失败！')
							}
						})
					}
				})
				// 创建copy
				this.$fs.stat(this.$path + 'copy', (err, status) => {
					if (err) {
						this.$fs.mkdir(this.$path + 'copy', e => {
							if (e) {
								this.$api.msg('创建copy目录失败！')
							}
						})
					}
				})
				// 检测logs目录
				this.$fs.stat(this.$path + 'logs', (err, status) => {
					if (err) {
						console.log(err)
						this.$fs.mkdir(this.$path + 'logs', e => {
							if (e) {
								this.$api.msg('创建目录失败！')
							}
						})
					}
				})
			} else {
				this.json = JSON.parse(d)
			}
		})
		this.$api.getPhrase().then(d => {
			this.phrase = d.data.hitokoto + ' - ' + d.data.author
		})
	},
	methods: {
		login () {
			if (this.json.password) {
				if (this.password === this.json.password) {
					this.$router.push('/index')
					this.$api.log('login')
				} else {
					this.$api.msg('密码错误')
				}
			} else {
				if (!this.password) {
					this.$api.msg('请输入密码')
					return
				}
				this.$fs.writeFile(this.$path + 'config.json', JSON.stringify({
					password: this.password,
					date: new Date()
				}), 'utf-8', e => {
					if (e) {
						this.$api.msg('创建密码失败！')
					} else {
						this.$router.push('/index')
						this.$api.log('login')
					}
				})
				this.$fs.writeFile(this.$path + 'acg配置文件勿删!.txt', 'acg配置文件勿删！', () => {})
			}
		},
		enter (e) {
			if (e.keyCode === 13) {
				this.login()
			}
		}
	}
}
</script>

<style scoped>
	.login{
		padding: 20px;
	}
</style>