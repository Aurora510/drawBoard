var drawBoard = {
    el:null,
    cav:null,
    ctx:null,
    controler:document.getElementsByClassName('controler')[0],
    colorBtn:document.getElementById('color'),
    eraserBtn:document.getElementById('eraser'),
    imgArr:[],
    init: function(options){
        this.initData(options);
        this.control();
        this.ctx.lineCap = 'round'; 
        this.ctx.lineJoin = 'round';
    },
    initData:function(options){
        this.el = options.el;
        this.cav = options.cav;
        this.ctx = options.cav.getContext('2d');
        this.cav.width = window.innerWidth-18;
        this.cav.height = window.innerHeight-200;
    },
    control:function(){
        this.draw();
        this.choseColor();
        this.choseRange();
        this.controlBtn();
    },
    draw:function(){
        var self = this;
        var ctx = this.ctx;
        this.cav.onmousedown = function(e){
            var outLeft = self.cav.offsetLeft;
            var outRight = self.cav.offsetTop;
            var left = e.pageX;
            var right = e.pageY;
            self.saveImg();
            ctx.beginPath();
            ctx.moveTo(left - outLeft,right - outRight)
            self.cav.onmousemove = function(e){
                var toLef = e.pageX;
                var toRig = e.pageY;
                ctx.lineTo(toLef,toRig)
                ctx.stroke();
            }
        };
        this.cav.onmouseup = function(e){
            self.cav.onmousemove = null;
            // ctx.closePath();
        }
        this.cav.onmouseleave = function(e){
            self.cav.onmousemove = null;
        }

        //移动端
        this.cav.addEventListener('touchstart',touch,false)
        this.cav.addEventListener('touchmove',touch,false)
        this.cav.addEventListener('touchend',touch,false)
        this.cav.addEventListener('touchcancel',touch,false)
        function touch (e){
            switch(e.type){
                case 'touchstart':
                    console.log('start')
                    var outLeft = self.cav.offsetLeft;
                    var outRight = self.cav.offsetTop;
                    var left = e.targetTouches[0].pageX;
                    var right = e.targetTouches[0].pageY;
                    self.saveImg();
                    console.log(outLeft)
                    ctx.beginPath();
                    ctx.moveTo(left - outLeft,right - outRight)
                    break;
                case 'touchmove':
                    console.log('move')
                    var toLef = e.targetTouches[0].pageX;
                    var toRig = e.targetTouches[0].pageY;
                    ctx.lineTo(toLef,toRig)
                    ctx.stroke(); 
                break;
            }
            
        };
    },
    saveImg:function(){
        var img = this.ctx.getImageData(0,0,this.cav.offsetWidth,this.cav.offsetHeight);
        this.imgArr.push(img);
    },
    controlBtn:function(){
        this.controler.addEventListener('click',e =>{
            var ele = e.target.id;
            switch(ele){
                case 'clear':
                    this.ctx.clearRect(0,0,this.cav.offsetWidth,this.cav.offsetHeight);
                    break;
                case 'eraser':
                    this.ctx.strokeStyle = '#fff';
                    break;
                case 'back':
                    if(this.imgArr.length>0){
                        this.ctx.putImageData(this.imgArr.pop(),0,0)
                    };
                    break;
            }
        })
        
    },
    choseColor:function(){
        var self = this;
        var ctx = this.ctx;
        this.colorBtn.onchange = function(){
            ctx.strokeStyle = self.colorBtn.value;
        }
    },
    choseRange:function(){
        var self = this;
        var range = document.getElementById('range')
        var ranSpan = document.getElementById('rangeSpan');
        range.onchange = function(){
            self.ctx.lineWidth = range.value;
            console.log(ranSpan)
            ranSpan.innerHTML = range.value;
        }
    },
}
