<template>
  	<div id="app">
        <img id="bg" :style="{height:h}" src="http://qzonestyle.gtimg.cn/qzone/qzactStatics/imgs/20171122191630_ff8fef.jpg">
  		<div v-if="$route.path!='/'" id="menu" :style="{position:s}">
  			<ul class="clearfix">
  				<li class="left"><a href="/">f5</a></li>
  				<li class="left"><a href="#/music">music</a></li>
  				<li class="left"><a href="#/video">video</a></li>
                <li class="left"><a href="#/fx">fx</a></li>
  			</ul>
  		</div>
  	  	<router-view id="view"></router-view>
  	</div>
</template>

<script>
  export default {
    name: 'project',
    data () {
        return {
            h: window.innerHeight + 'px',
            s: 'static'
        }
    },
    mounted () {
      window.addEventListener('scroll', e => {
        console.log(document.documentElement.scrollTop)
        if (document.documentElement.scrollTop > 100) {
          this.s = 'fixed'
        } else {
          this.s = 'static'
        }
      }, false)
    }
  }
</script>

<style lang="scss">
	#app{
		position: relative;
        #bg{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            z-index: -1;
            filter: blur(5px);
        }
	}
 	#menu{
        // position: fixed;
        left: 0;
        top: 0;
 		width: 100%;
        height: 50px;
        background: rgba(0,0,0,.6);
        ul{
            width: 100%;
            li{
                width: 80px;
                text-align: center;
                font-size: 18px;
                font-family: STCaiyun;
                text-shadow: 0 0 10px #2f3;
                a{
                    width: 100%;
                    display: block;
                    height: 30px;
                    line-height: 30px;
                    color: #fff;
                    margin-top: 10px;
                    transition: all .3s;
                }
                a:hover{
                    font-family: STHupo;
                    text-shadow: 0px 0 24px #f00;
                }
            }
        }
 	}
 	#view{
        // margin-top: 50px;
 		/*position: absolute;
 		left: 10px;
 		right: 0;
 		top: 0;
 		bottom: 0;*/
 	}
</style>
