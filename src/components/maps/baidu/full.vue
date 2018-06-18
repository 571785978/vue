<template>
  <div class="bd_map">
      <remote_js v-bind:src='src'></remote_js>
      <div id="allmap">
        
      </div>
      <el-input placeholder="搜索" id="suggestId" clearable> </el-input>
      <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
  </div>
</template>
<script>
import remote_js from "@/components/global/remote";
export default {
  data() {
    return {
      src:
        "http://api.map.baidu.com/api?v=2.0&ak=N4FQOCcFtOpdCNKjUbaScoWouL52AEqL&callback=init"
    };
  },
  components: {
    remote_js: remote_js
  },
  mounted: function() {
    setTimeout(() => {
      this.init();
    }, 1000);
  },
  methods: {
    init: function() {
      var map = new BMap.Map("allmap");
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
      var cityName;
      function myFun(result) {
        cityName = result.name;
        map.setCenter(cityName);
      }
      var myCity = new BMap.LocalCity();
      myCity.get(myFun);
      map.enableScrollWheelZoom(true);
      var top_left_control = new BMap.ScaleControl({
        anchor: BMAP_ANCHOR_TOP_LEFT
      }); // 左上角，添加比例尺
      var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
      // var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
      /*缩放控件type有四种类型:
          BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/
      map.addControl(top_left_control);
      map.addControl(top_left_navigation);

      var mapType1 = new BMap.MapTypeControl({
        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
      });

      map.addControl(mapType1);
      map.setCurrentCity(cityName);

      var overView = new BMap.OverviewMapControl();
	    var overViewOpen = new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
      map.addControl(overView);          //添加默认缩略地图控件
		  map.addControl(overViewOpen);

      //设置缩放最大级别
      map.setMinZoom(4);
      map.enableAutoResize();
      var menu = new BMap.ContextMenu();
      var txtMenuItem = [
        {
          text: "放大",
          callback: function() {
            map.zoomIn();
          }
        },
        {
          text: "缩小",
          callback: function() {
            map.zoomOut();
          }
        }
      ];
      for (var i = 0; i < txtMenuItem.length; i++) {
        menu.addItem(
          new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100)
        );
      }
      map.addContextMenu(menu);
      var ac = new BMap.Autocomplete({
        //建立一个自动完成的对象
        input: "suggestId",
        location: map
      });
      ac.addEventListener("onhighlight", function(e) {
        //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
          value =
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.business;
        }
        str =
          "FromItem<br />index = " +
          e.fromitem.index +
          "<br />value = " +
          value;

        value = "";
        if (e.toitem.index > -1) {
          _value = e.toitem.value;
          value =
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.business;
        }
        str +=
          "<br />ToItem<br />index = " +
          e.toitem.index +
          "<br />value = " +
          value;
        document.getElementById("searchResultPanel").innerHTML = str;
      });

      var myValue;
      ac.addEventListener("onconfirm", function(e) {
        //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
        document.getElementById("searchResultPanel").innerHTML =
          "onconfirm<br />index = " +
          e.item.index +
          "<br />myValue = " +
          myValue;

        map.clearOverlays(); //清除地图上所有覆盖物
        function myFun() {
          var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
          map.centerAndZoom(pp, 18);
          map.addOverlay(new BMap.Marker(pp)); //添加标注
        }
        var local = new BMap.LocalSearch(map, {
          //智能搜索
          onSearchComplete: myFun
        });
        local.search(myValue);
      });
      this.$emit('closeLoading');
    }
  }
};
</script>
<style scoped>
.bd_map{
  height: 100%;
}
#allmap {
  width: 100%;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
  height: 100%;
}
.el-input {
  position: absolute;
  font-size: 14px;
  display: inline-block;
  width: 16%;
  z-index: 999;
  left: 80px;
  top: 110px;
}
</style>
