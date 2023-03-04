document.getElementById("input").addEventListener("change", function() {
    var media = URL.createObjectURL(this.files[0]);
    var video = document.getElementById("video");
    video.src = media;
    video.style.display = "videoPlay";
});

const processor = {
    timerCallback() {
        if(this.video.paused || this.video.ended) {
            return;
        }

        this.computeFram();

        setTimeout(() => {
            this.timerCallback();
        }, 16);
    }, 

    doLoad() {
        this.video = document.getElementById("video");
        this.c1 = document.getElementById("canvas");
        this.ctx1 = this.c1.getContext("2d");

        this.video.addEventListener(
            "play", 
            () => {
                this.width = this.video.width;
                this.height = this.video.height;
                this.timerCallback();
            },
            false
        );
    }, 

    computeFrame() {
        this.ctx1.drawImage(this.video, 0, 0, 
            this.width, this.height);
        const frame = this.ctx1.getImageData(0, 0, this.width, 
            this.height);    
        const l = frame.data.length / 4;

        for(let i = 0; i < l; i++) {
            const gray = 
                (frame.data[i * 4 + 0] +  
                 frame.data[i * 4 + 1] + 
                 frame.data[i* 4 + 2]) / 
                 3;

            frame.data[i * 4 + 0] = gray;
            frame.data[i * 4 + 1] = gray;
            frame.data[i * 4 + 2] = gray;
        } 
        this.ctx1.putImageData(frame, 0, 0);

        return;
    },
};

processor.doLoad();