class DraggableElement {
    constructor(element) {
        this.element = (typeof element === "string") ? document.getElementById(element) : element;
        this._isDragIn = false;
        this._point = {x: 0, y: 0};

        // PC
        this.element.onmousedown = event => {this.onMouseDown(event);};
        window.onmouseup = event => {this.onMouseUp(event);};
        window.onmousemove = event => {this.onMouseMove(event);};
        window.onblur = event => {this.onBlur(event);};
        // スマホ
        this.element.ontouchstart = event => {this.onMouseDown(event);};
        window.ontouchend = event => {this.onMouseUp(event);};
        window.ontouchmove = event => {this.onMouseMove(event);};
        window.onblur = event => {this.onBlur(event);};

    }
    get x() {
        return this._point.x;
    }
    get y() {
        return this._point.y;
    }
    set(event) {
        // スクロール量
        const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        const scrollY = document.documentElement.scrollTop || document.body.scrollTop;

        // マウスイベントの絶対位置
        const rect = this.element.getBoundingClientRect();
        let x = event.pageX - (rect.left + scrollX);
        let y = event.pageY - (rect.top + scrollY);

        // 要素のサイズ
        const width = this.element.clientWidth;
        const height = this.element.clientHeight;

        // マウスが要素の外にある場合
        if(x < 0) {
            x = 0;
        } else if(width < x) {
            x = width;
        }
        if(y < 0) {
            y = 0;
        } else if(height < y) {
            y = height;
        }

        // 位置の代入
        this._point.x = x;
        this._point.y = y;
    }
    onMouseDown(event) {
        this._isDragIn = true;
        this.set(event);
        this.onChange();
    }
    onMouseMove(event) {
        if(this._isDragIn) {
            this.set(event);
            this.onChange();
        }
    }
    onMouseUp() {
        this._isDragIn = false;
    }
    onBlur() {
        this._isDragIn = false;
    }
    onChange() {
        // Please implement it.
    }
}