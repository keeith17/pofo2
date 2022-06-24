(($)=>{

    //클래스 형태
    class Pofo {
        init(){
            this.header();
            this.section1();
            this.section2();
            this.section3();
            this.section4();
            this.section5();
            this.section6();
            this.section7();
            this.section8();
            this.section9();
            this.quick();
            this.gotop();
        }
        header(){
            let t = false;
            let t2 = false;

            //모바일 메인메뉴 버튼 클릭
            $('.mobile-btn').on({
                click: function(){
                    $(this).toggleClass('on');
                    $('#nav').stop().slideToggle(300);
                }
            });

            //기본값
            $('.sub').stop().slideUp(0);

            $(window).resize(function(){
                resizeNav();
            });    


            //반응형 내비게이션
            function resizeNav(){
                if( $(window).width()<=991){
                    $('#nav').stop().hide();
                    t2=false;
                    if (t===false){
                        t=true;
                        $('.main-btn').bind({
                            click: function(){
                                $(this).next().stop().slideToggle(300);
                            }
                        });           
                        // 마우스오버 이벤트 삭제
                        $('.main-btn').off('mouseenter');  
                        $('.sub').stop().fadeOut(0);

                    }
                }
                else {
                    $('.mobile-btn').removeClass('on');
                    $('#nav').stop().show();
                    t=false;
                    if(t2===false){
                        t2=true;
                        //데스크탑 메인메뉴 마우스오버
                        $('.main-btn').off('click');
                        $('.main-btn').on('click');
                        $('.sub').stop().slideUp(0);

                        $('.main-btn').on({
                            mouseenter: function(){
                                $('.sub').fadeOut(0);
                                $(this).next().fadeIn(300);
                            }
                        });
                    
                        $('#nav').on({
                            mouseleave: function(){
                                $('.sub').fadeOut(300);
                            }
                        });
                    
                        //서브메뉴
                        $('.sub-btn').on({
                            mouseenter: function(){
                                $('.sub-sub').fadeOut(0);
                                $(this).next().fadeIn(300);
                            }
                        });
                        $('.col24').on({
                            mouseleave: function(){
                                $('.sub-sub').fadeOut(0);
                            }
                        });
                    }
                }
            }

            resizeNav();



            //스크롤이벤트
            let result = null;
            let newscroll = null;
            let oldscroll = newscroll;

            $(window).scroll(function(){
                //console.log( $(window).scrollTop() );
                newscroll = $(window).scrollTop();
                result = newscroll - oldscroll > 0 ? 'DOWN' : 'UP';
                //console.log(result);
                if(result === 'DOWN'){
                    $('#header').addClass('hide');
                    $('#header').removeClass('h60');
                }
                if(result === 'UP'){
                    $('#header').addClass('h60');
                    $('#header').removeClass('hide');
                }
                if($(window).scrollTop()===0){
                    $('#header').removeClass('h60');
                    $('#header').removeClass('hide');
                }
                oldscroll = newscroll;
            });
            


        }
        section1(){
            //터치스와이프 드래그앤드롭 변수
            let touchStart  = null;
            let touchEnd = null;
            let result = null;

            let dragStart = null;
            let dragEnd = null;
            let mouseDown = false;

            //슬라이드 변수
            let cnt = 0;
            let setId = 0;
            let setId2 = 0;

            //반응형 너비 변수
            let winW = $(window).width();

            $(window).resize(function(){
                winW = $(window).width();
                $('#section1 .slide-wrap').stop().animate({left:-winW*cnt},600);
                //console.log(winW);
                return winW;
            });

            //메인슬라이드 함수
            function mainSlide(){
                $('#section1 .slide-wrap').stop().animate({left:-winW*cnt},600,"easeInOutExpo", function(){
                    cnt>2?cnt=0:cnt;
                    cnt<0?cnt=2:cnt;
                    $('#section1 .slide-wrap').stop().animate({left:-winW*cnt},0);
                })
            }

            //다음카운트 함수
            function nextCount(){
                cnt++;
                mainSlide();
            }
            //이전카운트 함수
            function prevCount(){
                cnt--;
                mainSlide();
            }

            //자동타이머 함수
            function autoTimer(){
                setId = setInterval(nextCount, 3000);
            }
            autoTimer();

            function gostop(){
                let cnt2 = 0;
                clearInterval(setId);
                clearInterval(setId2);
                setId2 = setInterval(function(){
                    cnt2++;
                    //console.log(cnt2);
                    if(cnt2>=7){
                        clearInterval(setId);
                        clearInterval(setId2);
                        nextCount();
                        autoTimer();
                    }
                },1000);
            }

            
            $('#section1 .slide-container').on({
                mousedown: function(e){
                    gostop();

                    touchStart = e.clientX;
                    dragStart = e.clientX - $('#section1 .slide-wrap').offset().left-winW;
                    // console.log(`$('.slide-wrap').offset().left`, $('.slide-wrap').offset().left);
                    // console.log(`$('.slide-wrap').offset().left-winW`, $('.slide-wrap').offset().left-winW);
                    // console.log(`dragStart`,dragStart);
                    // console.log(`e.clientX`, e.clientX);
                    mouseDown = true;
                },
                mouseup: function(e){
                    touchEnd = e.clientX;
                    result = touchStart - touchEnd > 0 ? 'NEXT' : 'PREV';
                    if(result==='NEXT'){
                        if( !$('#section1 .slide-wrap').is(':animated')){
                        nextCount();
                        }
                    }
                    if(result==='PREV'){
                        if( !$('#section1 .slide-wrap').is(':animated')){
                        prevCount();
                        }
                    }
                    mouseDown = false;
                },
                mousemove: function(e){
                    if(!mouseDown){
                        return;
                    }
                    dragEnd = e.clientX;
                    //console.log('dragEnd',dragEnd);
                    $('#section1 .slide-wrap').css({left:dragEnd-dragStart});
                },
                mouseleave: function(e){
                    if(!mouseDown){
                        return;
                    }
                    touchEnd = e.clientX;
                    result = touchStart - touchEnd > 0 ? 'NEXT' : 'PREV';
                    if(result==='NEXT'){
                        nextCount();
                    }
                    if(result==='PREV'){
                        prevCount();
                    }
                    mouseDown = false;

                }
            });

            $('#section1 .slide-container').on({
                touchstart: function(e){
                    gostop();

                    touchStart = e.originalEvent.changedTouches[0].clientX;
                    dragStart = e.originalEvent.changedTouches[0].clientX - $('#section1 .slide-wrap').offset().left-winW;
                    //console.log(`$('.slide-wrap').offset().left`, $('.slide-wrap').offset().left);
                    //console.log(`$('.slide-wrap').offset().left-winW`, $('.slide-wrap').offset().left-winW);
                    //console.log(`dragStart`,dragStart);
                    //console.log(`e.clientX`, e.clientX);
                    mouseDown = true;
                },
                touchend: function(e){
                    touchEnd = e.originalEvent.changedTouches[0].clientX;
                    result = touchStart - touchEnd > 0 ? 'NEXT' : 'PREV';
                    if(result==='NEXT'){
                        if( !$('#section1 .slide-wrap').is(':animated')){
                        nextCount();
                        }
                    }
                    if(result==='PREV'){
                        if( !$('#section1 .slide-wrap').is(':animated')){
                        prevCount();
                        }
                    }
                    mouseDown = false;
                },
                touchmove: function(e){
                    if(!mouseDown){
                        return;
                    }
                    dragEnd = e.originalEvent.changedTouches[0].clientX;
                    //console.log('dragEnd',dragEnd);
                    $('#section1 .slide-wrap').css({left:dragEnd-dragStart});
                }

            });


        }
        section2(){
            //스크롤이벤트
            //섹션2번이 노출되면 패럴럭스 구현 추가 클래스 sec2Ani
            const sec2Top = $('#section2').offset().top - $(window).height();
            $(window).scroll(function(){
                if( $(window).scrollTop() > sec2Top ){
                    $('#section2').addClass('sec2Ani');
                }
                if( $(window).scrollTop() === 0 ){
                    $('#section2').removeClass('sec2Ani');
                }
            });
        }
        section3(){
            const sec3Top = $('#section3').offset().top - $(window).height();
            $(window).scroll(()=>{
                if($(window).scrollTop() > sec3Top){
                    $('#section3').addClass('sec3Ani');
                }
                if($(window).scrollTop() === 0 ){
                    $('#section3').removeClass('sec3Ani');
                }
            });
        }
        section4(){

            let idx = 0; //8개 2줄 디폴트 배치

            let winW = $(window).width();
            let cols = 4; //데스크탑 기본이 4개
            let imgW = $(window).width()/4;
            let imgH = imgW*0.8125; //높이

            let n = $('.gallery-list').length;
            let h = $('.gallery-list.hide').length; //hide 개수
            let rows = Math.ceil((n-h)/cols); //자리올림 함수: ceil() / 자리내림 함수: floor() / 반올림: round()

            const sec4Top = $('#section4').offset().top - $(window).height()
            let scr = false;

            $(window).scroll(()=>{
                if($(window).scrollTop() > sec4Top){
                    if(scr===false){
                        scr=true;
                        $('#section4').addClass('sec4Ani');
                    }
                }
                if($(window).scrollTop() === 0 ){
                    $('#section4').removeClass('sec4Ani');
                    scr=false;
                }
            });

            //로딩시 한번 강제 실행
            setTimeout(galleryMain, 100);

            //반응형 윈도우 리사이즈
            $(window).resize(function(){
                galleryMain();
            })

            $('.gallery-btn').each(function(index){
                $(this).on({
                    click: function(e){
                        e.preventDefault();
                        $('#section4').removeClass('sec4Ani');
                        idx = index;
                        // $('#section4').removeClass('sec4Ani1');
                        // $('#section4').removeClass('sec4Ani2');    
                        galleryMain();
                        $('.gallery-btn').removeClass('on');
                        $(this).addClass('on');
                    }
                });
            });
            function galleryMain(){
                winW = $(window).width();
                cols = 4; //데스크탑 기본이 4개
                if(winW >= 1280){
                    cols = 4;
                }
                else if(winW >= 1024){
                    cols = 3;
                }
                else if(winW >= 600){
                    cols = 2;
                }
                else {
                    cols = 1;
                }

                imgW = winW/cols;
                imgH = imgW*0.8125; //높이
    
                //갤러리 가로 4개인 열(칸) 1개의 너비
                $('.gallery-list').removeClass('zoomin');
                $('.gallery-list').stop().animate({width:imgW,height:imgH}).removeClass('hide'); //반응형 만들기니까
                $('.gallery-list .img-wrap').css({width:imgW});
                if(idx === 0 ) {    //8개
                    switch(cols){
                        case 4:
                            $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                            $('.gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                            $('.gallery-list').eq(3).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
        
                            $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                            $('.gallery-list').eq(6).show().stop().animate({left:imgW*2,top:imgH*1}, 300);
                            $('.gallery-list').eq(7).show().stop().animate({left:imgW*3,top:imgH*1}, 300);        
                            break;

                        case 3:
                            $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                            $('.gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);

                            $('.gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                            $('.gallery-list').eq(4).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*2,top:imgH*1}, 300);

                            $('.gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                            $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*2}, 300);        
                            break;
                        
                        case 2:
                            $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);

                            $('.gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                            $('.gallery-list').eq(3).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
        
                            $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*2}, 300);

                            $('.gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                            $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*3}, 300);
        
                            break;
                        
                        default:
                            $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                            $('.gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                            $('.gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                            $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*5}, 300);
                            $('.gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*6}, 300);
                            $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*7}, 300);
        
                    }
                }
                else if(idx === 1 ) {
                    switch(cols){
                        case 4:
                            $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                            $('.gallery-list').eq(7).show().stop().animate({left:imgW*2,top:imgH*0}, 300);        
                            break;

                        case 3:
                            $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                            $('.gallery-list').eq(7).show().stop().animate({left:imgW*2,top:imgH*0}, 300);        
                            break;

                        case 2:
                            $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                            $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
        
                            break;

                        default:
                            $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                            $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*2}, 300);        

                            
                    }  
                    $('.gallery-list').eq(0).hide().addClass('hide');
                    $('.gallery-list').eq(2).hide().addClass('hide');
                    $('.gallery-list').eq(3).hide().addClass('hide');
                    $('.gallery-list').eq(4).hide().addClass('hide');
                    $('.gallery-list').eq(6).hide().addClass('hide');
                }
                else if(idx === 2 ) {
                    switch(cols){
                        case 4:
                            $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                            $('.gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                            $('.gallery-list').eq(4).show().stop().animate({left:imgW*3,top:imgH*0}, 300);

                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                            $('.gallery-list').eq(6).show().stop().animate({left:imgW*1,top:imgH*1}, 300);        
                            break;

                        case 3:
                            $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                            $('.gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);

                            $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                            $('.gallery-list').eq(6).show().stop().animate({left:imgW*2,top:imgH*1}, 300);
                            break;

                        case 2:
                            $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                            $('.gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                            $('.gallery-list').eq(4).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                            $('.gallery-list').eq(6).show().stop().animate({left:imgW*1,top:imgH*2}, 300);
                            break;
                            
                        default:
                            $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                            $('.gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                            $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
                            $('.gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*5}, 300);        
                    }
                    $('.gallery-list').eq(3).hide().addClass('hide');
                    $('.gallery-list').eq(7).hide().addClass('hide');
                }
                else if(idx === 3 ) {
                    switch(cols){
                        case 4:
                            $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                            $('.gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*3,top:imgH*0}, 300);        
                            break;

                        case 3:
                            $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                            $('.gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);        
                            break;

                        case 2:
                            $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                            $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);        
                            break;
                            
                        default:
                            $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                            $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*3}, 300);        
                    }
                    $('.gallery-list').eq(1).hide().addClass('hide');
                    $('.gallery-list').eq(3).hide().addClass('hide');
                    $('.gallery-list').eq(6).hide().addClass('hide');
                    $('.gallery-list').eq(7).hide().addClass('hide');
                }
                else if(idx === 4 ) {
                    switch(cols){
                        case 4:
                            $('.gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);        
                            break;

                        case 3:
                            $('.gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);        
                            break;

                        case 2:
                            $('.gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);        
                            break;
                            
                        default:
                            $('.gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);        
                    }
                    $('.gallery-list').eq(0).hide().addClass('hide');
                    $('.gallery-list').eq(1).hide().addClass('hide');
                    $('.gallery-list').eq(2).hide().addClass('hide');
                    $('.gallery-list').eq(4).hide().addClass('hide');
                    $('.gallery-list').eq(5).hide().addClass('hide');
                    $('.gallery-list').eq(6).hide().addClass('hide');
                }
                else if(idx === 5 ) {
                    switch(cols){
                        case 4:
                            $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(3).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                            $('.gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
                            $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);        
                            break;

                        case 3:
                            $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(3).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                            $('.gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                            $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*1}, 300);        
                            break;

                        case 2:
                            $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(3).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                            $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                            $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*2}, 300);        
                            break;
                            
                        default:
                            $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                            $('.gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                            $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                            $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                            $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*4}, 300);        
                    }
                    $('.gallery-list').eq(0).hide().addClass('hide');
                    $('.gallery-list').eq(2).hide().addClass('hide');
                    $('.gallery-list').eq(6).hide().addClass('hide');
                }



                //자신의 선택자 위치에서 찾는 함수는 hasClass()
                //console.log('hide 개수', $('.gallery-list').hasClass('hide'));
                //console.log('hide 개수 length 사용', $('.gallery-list.hide').length);
                //hide 클래스가 몇 개니?
                h = $('.gallery-list.hide').length;
                rows = Math.ceil((n-h)/cols);
                // console.log('rows', rows);
                // console.log('n', n);
                // console.log('h', h);
                // console.log('cols', cols);
                // console.log('imgH*rows', imgH*rows);

                $('.gallery-wrap').stop().animate({height: imgH*rows}, 300);
                //줌 효과
                $('.gallery-list').addClass('zoomin');
                
            }
        }
        section5(){
            const svgObj = $('.ring-front circle');
            let svgArr = [];
            let perSize = [];
            let piece = [];
            let per = [.9, .75, .9, .62]
            let second = 5;
            let sum = [0,0,0,0];
            let setId = [0,0,0,0];

            const sec5Top = $('#section5').offset().top - $(window).height()
            let t = false;
            $(window).scroll(()=>{
                if($(window).scrollTop() > sec5Top){
                    if(t===false){
                        t=true;
                        $('#section5').addClass('sec5Ani');
                        svgAnimation();    
                    }
                }
                if($(window).scrollTop() === 0 ){
                    $('#section5').removeClass('sec5Ani');
                    t=false;
                }
            });

            function svgAnimation(){
                
                $.each(svgObj, function(idx, obj){
                    sum = [0,0,0,0];
                    //console.log(idx, obj, obj.getTotalLength());
                    //1 총 길이
                    svgArr[idx] = obj.getTotalLength(); //4개가 배열에 저장
                    //2 각 요소의 전체 길이 대입 - 초기 설정
                    $(obj).css({ strokeDasharray: svgArr[idx] }); //전체 길이도 전체 길이
                    $(obj).css({ strokeDashoffset: svgArr[idx] }); //삭제할 길이도 전체 길이 -> 연한 회색만 보임
                    //3 각 요소의 퍼센트 길이
                    //  퍼센트 배열 변수 필요
                    perSize[idx] = svgArr[idx] * per[idx]; //전체 길이 * 각각 퍼센트
                    //4 각 요소의 마디 길이
                    piece[idx] = perSize[idx]/second/100; //인터벌 한 번마다 증가할 양
                    //5 카운트 타이머 이용
                    function sumfn(){
                        sum[idx] += piece[idx];
                        if(sum[idx] > perSize[idx]){
                            clearInterval(setId[idx]);
                        }
                        else {
                        //6 애니메이션 구현
                            $(obj).css({ strokeDashoffset: svgArr[idx] - sum[idx] }) //100만큼 까다가 99만큼 까고 98만큼 까고 이러면 1씩 2씩 증가하는 효과
                            $('.count-num').eq(idx).html( `${Math.ceil(sum[idx] / svgArr[idx] * 100)}%` );
                        }
                    }
                    //7 타이머 설정
                        setId[idx] = setInterval(sumfn, 3);
                });
            }
        }
        section6(){

            const sec6Top = $('#section6').offset().top - $(window).height()
            let t = false;
            $(window).scroll(function(){
                if($(window).scrollTop() > sec6Top){
                    if(t===false){
                        t=true;
                        $('#section6').addClass('sec6Ani');
                    }
                }
                if($(window).scrollTop() === 0){
                    t=false;
                    $('#section6').removeClass('sec6Ani');
                }
            });

        }
        section7(){
            let winH = $(window).height()
            let sec7Top = $('#section7').offset().top - winH
            let t = false;
            $(window).scroll(function(){
                if($(window).scrollTop() > sec7Top){
                    if(t===false){
                        t=true;
                        $('#section7').addClass('sec7Ani');
                    }
                }
                if($(window).scrollTop() === 0){
                    t=false;
                    $('#section7').removeClass('sec7Ani');
                }
            });
        }
        section8(){
            let winH = $(window).height()
            let sec8Top = $('#section8').offset().top - winH
            let t = false;
            $(window).scroll(function(){
                if($(window).scrollTop() > sec8Top){
                    if(t===false){
                        t=true;
                        $('#section8').addClass('sec8Ani');
                    }
                }
                if($(window).scrollTop() === 0){
                    t=false;
                    $('#section8').removeClass('sec8Ani');
                }
            });
        }
        section9(){
            let winH = $(window).height()
            let sec9Top = $('#section9').offset().top - winH
            let t = false;
            $(window).scroll(function(){
                if($(window).scrollTop() > sec9Top){
                    if(t===false){
                        t=true;
                        $('#section9').addClass('sec9Ani');
                    }
                }
                if($(window).scrollTop() === 0){
                    t=false;
                    $('#section9').removeClass('sec9Ani');
                }
            });
        }

        quick(){
            let quickTop = ($(window).height() - $('#quick').height())-600;
            $(window).scroll(function(){
                //console.log(quickTop);
                $('#quick').stop().animate({top:quickTop + $(window).scrollTop()}, 300, 'easeOutExpo');
            });
        }

        gotop(){
            $(window).scroll(function(){
                if($(window).scrollTop()>100){
                    $('#goTop').stop().fadeIn(1000);
                }
                else{
                    $('#goTop').stop().fadeOut(1000);
                }
            });
            
            $('#goTop').on({
                click: function(){
                    $('html').stop().animate({scrollTop:0}, 300);
                }
            });
        }
    }
    const newPofo = new Pofo();
    newPofo.init();

})(jQuery);