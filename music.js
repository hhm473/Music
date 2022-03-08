var rotateVal = 0 // 旋转角度
var InterVal // 定时器


    var app=new Vue({
        el: "#app",
        data:{
            
            query:"",
            musiclist:[],
            key:"",
            // 歌曲url
            musicurl:"",
            // 封面
            musiccover:"",
            //评论
            commentlist:[],

            musicname:"",
            //mv播放
            isshow:false,
            mvurl:"",
            //是否点击播放
            isplay:false,
            //是否有歌曲列表
            ishave:false
        },
        methods:{
            searchmusic:function(){
                var that=this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
            .then(function(response){
                // console.log(response);    
                that.musiclist =response.data.result.songs;   
                that.ishave=true;      
            },function(err){})
        },
            playmusic:function(item,key){
                var that=this;
                axios.get("https://autumnfish.cn/song/url?id="+item.id)
                .then(function(response){
                    // console.log(response.data.data[0].url);
                    that.musicurl=response.data.data[0].url;
                    console.log(that.musicurl);
                    that.key=key;
                    that.isplay=true;
                },function (err) {  })

                axios.get("https://autumnfish.cn/song/detail?ids="+item.id)
                .then(function(response){
                    that.musiccover=response.data.songs[0].al.picUrl;
                },function (err) {  })

                axios.get("https://autumnfish.cn/comment/hot?type=0&id="+item.id)
                .then(function(response){
                    that.commentlist=response.data.hotComments;
                },function (err) {  })

                that.musicname=item.name;
            },

            play:function(){
                // this.isplay=true;
                if(InterVal)
                {clearInterval(InterVal);}
                rotate();
            },

            pause:function(){
                // this.isplay=false;
                clearInterval(InterVal);
            },

            playMV:function(mvid){
                var that=this;
                axios.get("https://autumnfish.cn/mv/url?id="+mvid)
                .then(function (response) {
                    that.isshow=true;
                    that.mvurl=response.data.data.url;
                  })
            },

            cshow:function(){
                this.isshow=false;
                var mv=document.querySelector("video");
                mv.pause();
            },

            last:function(){
               
                this.playmusic(this.musiclist[this.key-1],this.key-1)

            },
            next:function(){
                this.playmusic(this.musiclist[this.key+1],this.key+1)
            }

        }
    })

   
    function rotate () {
				InterVal = setInterval(function () {
					var img = document.querySelector('.cover')
					rotateVal += 1
					// 设置旋转属性(顺时针)
					img.style.transform = 'rotate(' + rotateVal + 'deg)'
					// 设置旋转属性(逆时针)
					//img.style.transform = 'rotate(-' + rotateVal + 'deg)'
					// 设置旋转时的动画  匀速0.1s
					img.style.transition = '0.1s linear'
				}, 100)
			}

    
