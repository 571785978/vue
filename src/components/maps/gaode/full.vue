<!--  
  描述：拖放地图组件，默认尺寸是 500 * 300  
  
  接收属性参数：  
    lat: 纬度  
    lng: 经度  
  
  自定义事件：  
    drag: 拖放完成事件  
  
  示例：  
    <mapDrag @drag="dragMap" lat="22.574405" lng="114.095388"></mapDrag>  
-->  
<template>
  <div class="m-map">  
  <remote_js v-bind:src='src'></remote_js>
    <!-- <div class="search" >  
       <el-input id="tipinput" placeholder="搜索" clearable/>
    </div>   -->
    <div id="container"></div>  
  </div>  
</template>  
<script>
  import remote_js from '@/components/global/remote'
  export default {
    data() {
      return {
        mapKey: "065b5fdab2a4b8edce4a2a745547879c", //高德地图的key
        initFlg:false,
        src:'http://webapi.amap.com/maps?v=1.4.6&key=065b5fdab2a4b8edce4a2a745547879c'
      };
    },
    components:{
      remote_js:remote_js
    },
    props: {},
    mounted: function() {
      this.init();
    },
    watch: {
      
    },
    methods: {
      // 实例化地图
      initMap() {
        var map = new AMap.Map('container',{
            resizeEnable: true,//定位
        });
        //借助浏览器定位
        map.plugin('AMap.Geolocation', function() {
          var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,     
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: 'RB'
          })

          geolocation.getCurrentPosition()
          //搜索服务
          // AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
          //   var autoOptions = {
          //     // 城市，默认全国 
          //     // 使用联想输入的input的id
          //     input: "tipinput"
          //   }
          //   var autocomplete= new AMap.Autocomplete(autoOptions)

          //   var placeSearch = new AMap.PlaceSearch({
          //     map:map
          //   })
          //   AMap.event.addListener(autocomplete, 'select', function(e){
          //     //TODO 针对选中的poi实现自己的功能
          //     placeSearch.search(e.poi.name)
          //   });
          // })
        })

        this.$emit('closeLoading');
      },
      init() {
        setTimeout(() => {
          this.initMap();
        }, 1000);
      }
    }
  };
</script>  
  
<style lang="css" scoped>
  .m-map {
    height: 100%;
    position: relative;
  }
  #container {
    width: 100%;
    height: 100%;
  }
  .m-map .search {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 285px;
    z-index: 1;
  }
  .m-map .search input {
    width: 180px;
    border: 1px solid #ccc;
    line-height: 20px;
    padding: 5px;
    outline: none;
  }
  .m-map .search button {
    line-height: 26px;
    background: #fff;
    border: 1px solid #ccc;
    width: 50px;
    text-align: center;
  }
  .m-map .result {
    max-height: 300px;
    overflow: auto;
    margin-top: 10px;
  }
</style>  