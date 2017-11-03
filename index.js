Vue.component('image-item', {
	props: ['image'],
	template: '<li><img v-bind:id="image.id" v-bind:src="image.src"></li>'
})

var app = new Vue({
  el: '#app',
  data: {
  	message: 'Hello bokete!',
  	images: [],
  },
  created: function () {
    for (let i = 1; i <= 10; i++) {
      let src = 'http://ss.bokete.jp/' + i + '.jpg';
      let id = 'image-' + i;
      let imageObj = {
        src: src,
        id: id
      };
      this.images.push(imageObj);
    }
  },
  mounted: function () {
    $('#image-scroll').scrollTop(($('#image-ul').height() - $('#image-scroll').scrollTop()) / 2);
  },
  methods: {
    onScroll (event) {
      let target = event.target;
      if (target.scrollTop + target.offsetHeight >= target.scrollHeight) {
        // BOTTOM
        let topImage = this.images.shift();
        this.images.push(topImage);
        setTimeout(function(){
          $('#image-scroll').scrollTop(target.scrollTop - $('#'+topImage.id).parent().height());
        }, 10)

      } else if (target.scrollTop <= 0) {
        // TOP
        let bottomImage = this.images.pop();
        this.images.unshift(bottomImage);
        setTimeout(function(){
          $('#image-scroll').scrollTop($('#'+bottomImage.id).parent().height());
        }, 10)
      }
    }
  }
})
