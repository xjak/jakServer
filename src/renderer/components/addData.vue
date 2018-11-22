<template>
	<div class="add">
		<div class="add-query">
			<input type="text" v-model="searchText">
			<button @click="doubanQuery">豆瓣</button>
			<guess :text="searchText" @select="callback"></guess>
		</div>
		<div class="searchShowList" v-show="idList[0]">
			<ul>
				<li v-for="x in idList" @click="doubanDetails(x.id)">{{x.title}}-{{x.year}}</li>
			</ul>
		</div>
		<ul>
			<li>
				<label>name：</label>
				<input type="text" v-model="d.name">
			</li>
			<li>
				<label>msg：</label>
				<input type="text" v-model="d.msg">
			</li>
			<li>
				<label>img：</label>
				<input type="text" v-model="d.img">
			</li>
			<li>
				<label>status：</label>
				<select v-model="d.status">
					<option value="0" selected>未</option>
					<option value="1">已</option>
				</select>
			</li>
			<li>
				<label>type：</label>
				<select v-model="d.type">
					<option value="0" selected>动画</option>
					<option value="1">电影</option>
					<option value="2">电视剧</option>
					<option value="3">--</option>
				</select>
			</li>
			<li>
				<label>details：</label>
				<input type="text" v-model="d.details">
			</li>
			<li>
				<label>region：</label>
				<input type="text" v-model="d.region">
			</li>
			<li>
				<label>author：</label>
				<input type="text" v-model="d.author">
			</li>
			<li>
				<label>score：</label>
				<input type="text" v-model="d.score">
			</li>
			<li>
				<label>update：</label>
				<input type="text" v-model="d.update">
			</li>
			<li>
				<label>dateRrelease：</label>
				<input type="text" v-model="d.dateRrelease">
			</li>
			<li>
				<label>press：</label>
				<input type="text" v-model="d.press">
			</li>
			<li><button @click="add">完成</button></li>
		</ul>
	</div>
</template>

<script>
import guess from '../components/guess'
export default {
	components: {
		guess
	},
	data () {
		return {
			idList: [],
			searchText: '',
			d: {
				name: '', // 名字
				msg: '', // 描述
				img: '', // logo
				status: '0', // 观看状态
				time: '', // 入库时间
				type: '0', // 类型 0 动 1 电 2 剧
				details: '', // 详情
				region: '', // 产地
				author: '', // 作者
				score: '', // 评分
				update: '', // 更新状态
				dateRrelease: '', // 发行日期
				press: '', // 出版社
				size: '', // 集数
				toStar: '', // 主演
				language: '', // 语言
				season: '', // 季数
				birthday: '' // 发行日期
			},
			list: []
		}
	},
	created () {
	},
	methods: {
		callback (v) {
			console.log(v)
			this.searchText = v
			this.d.name = v
		},
		doubanQuery () {
			this.$api.loading(1)
			this.$axios.get('https://movie.douban.com/j/subject_suggest?q=' + this.searchText)
			.then(d => {
				this.$api.loading(0)
				this.idList = d.data
				console.log(d.data)
			})
		},
		doubanDetails (id) {
			this.$api.loading(1)
			this.idList = []
			this.$axios.get('https://movie.douban.com/subject/' + id)
			.then(d => {
				let x = document.createElement('div')
				x.innerHTML = d.data.replace(/(src=|href=)/g, 'data-src=').replace(/<script("[^"]*"|'[^']*'|[^'">])*>/g, '')
				this.d.number = x.querySelector('.rating_num').innerText
				this.d.img = x.querySelector('img[rel="v:image"]').getAttribute('data-src')
				x = x.querySelector('#info').innerHTML.split(/\n/)
				x = x.map(v => {
					return v.replace(/([^\u4e00-\u9fa50-9:])/g, '').replace(/:+/g, ':').replace(/:/, '=')
				})
				x.forEach(v => {
					if (v.indexOf('编剧') !== -1) {
						this.d.author = v.replace(/[0-9:]+/g, '-').replace('-', '').split('=')[1]
					} else if (v.indexOf('主演') !== -1) {
						this.d.toStar = v.replace(/[0-9:]+/g, '-').replace('-', '').split('=')[1]
					} else if (v.indexOf('类型') !== -1) {
						this.d.type = v.replace(/:/g, '-').split('=')[1]
					} else if (v.indexOf('地区') !== -1) {
						this.d.region = v.split('=')[1]
					} else if (v.indexOf('语言') !== -1) {
						this.d.language = v.split('=')[1]
					} else if (v.indexOf('首播') !== -1) {
						this.d.dateRrelease = v.split('=')[1]
					} else if (v.indexOf('季数') !== -1) {
						this.d.season = v.split('=')[1]
					} else if (v.indexOf('集数') !== -1) {
						this.d.size = v.split('=')[1]
					} else if (v.indexOf('又名') !== -1) {
						this.d.msg = v.split('=')[1]
					}
				})
				this.$api.loading(0)
			})
		},
		add () {
			if (this.d.name) {
				let time = Date.now()
				this.d.time = this.$api.getTime(time)
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

<style lang="scss">
.add{
	.add-query{
		width: 400px;
		margin: 0 auto;
		padding-left: 70px;
		position: relative;
		input{
			height: 30px;
		}
		button{
			height: 30px;
			border: none;
			background: #2ef;
			outline: none;
			padding: 0 5px;
		}
	}
	.searchShowList{
		position: fixed;
		background: #fefefe;
		width: 150px;
		height: 200px;
		left: 50%;
		top: 50%;
		margin-top: -100px;
		margin-left: -75px;
		box-shadow: 0 0 22px #666;
		ul{
			width: 100%;
		}
		li{
			width: 100%;
			text-align: center;
			font-size: 12px;
    		cursor: pointer;
		}
		li:hover{
			background: #12c;
			color: #fff
		}
	}
	ul{
		width: 400px;
		margin: 0 auto;
		li{
			margin-top: 8px;
			label{
				display: inline-block;
				width: 130px;
				text-align: right;
			}
			input{
				width: 260px;
				height: 28px;
				padding-left: 5px;
			}
			select{
				width: 130px;
				height: 28px;
			}
		}
	}
}
</style>