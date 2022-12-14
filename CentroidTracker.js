(() => {
    var t = {
            10: t => {
                class e {
                    constructor(t, e) {
                        this.objectID = t,
                            this.centroids = [e],
                            this.counted = !1
                    }
                }
                t.exports = class {
                    constructor(t = 50) {
                        this.nextObjectID = 0,
                            this.objects = {},
                            this.disappeared = {},
                            this.trackableObjects = {},
                            this.maxDisappeared = t
                    }
                    euclideanDistance(t, e) {
                        const s = t[0] - e[0],
                            i = t[1] - e[1];
                        return Math.sqrt(s * s + i * i) //歐式距離
                    }
                    register(t) {
                        this.objects[this.nextObjectID] = t, //當註冊一個對象時，使用下一個可用的對象的ID來存儲中心點
                            this.disappeared[this.nextObjectID] = 0,
                            this.nextObjectID++
                    }
                    deregister(t) {
                        delete this.objects[t],
                            delete this.disappeared[t],
                            delete this.trackableObjects[t]
                    }
                    update(t) {
                        if (0 == t.length) //檢查輸入邊界框的矩形列表是否為空 ( 還有沒有 框框 )
                            return Object.keys(
                                this.disappeared).forEach((
                                t => {
                                    this.disappeared[t] += 1,
                                        this.disappeared[t] > this.maxDisappeared && this.deregister(t)
                                })), //Max disapear frames,不見太多偵了
                            Object.assign({}, this.objects);
                        let e = [];
                        for (let s = 0; s < t.length; s++) //循環計算邊界框的矩形
                            e.push([~~((t[s].topLeft[0] + t[s].bottomRight[0]) / 2), //~~ 運算子 取整數
                            ~~((t[s].topLeft[1] + t[s].bottomRight[1]) / 2)
                        ]);
                        if (0 == Object.keys(this.objects).length) //如果目前沒有追踪任何物體，註冊每一個輸入的中心點
                            e.forEach((t => { this.register(t) }));
                        else {
                            const t = Object.keys(this.objects),
                                s = t.map((t => this.objects[t]));
                            let i = new Array(this.objects.length);
                            for (let t = 0; t < s.length; t++) {
                                i[t] = new Array(e.length);
                                for (let r = 0; r < e.length; r++)
                                    i[t][r] = this.euclideanDistance(e[r], s[t]) //計算每對對象之間的距離
                            }
                            let r = [],
                                h = [];
                            for (let t = 0; t < i.length; t++) {
                                r.push(Math.min(...i[t]));
                                let e = i[t][0];
                                h.push(0);
                                for (let s = 1; s < i[t].length; s++)
                                    i[t][s] <= e && (e = i[t][s], h[t] = s)
                            }
                            const a = r.map(((t, e) => [t, e])).sort().map((t => t[1]));
                            let c = [];
                            for (let t = 0; t < h.length; t++)
                                c.push(h[a[t]]);
                            let n = [],
                                l = [];
                            for (let s = 0; s < a.length; s++) {
                                if (n.includes(a[s]) || l.includes(c[s]))
                                    continue;
                                const i = t[a[s]];
                                this.objects[i] = e[c[s]],
                                    this.disappeared[i] = 0,
                                    n.push(a[s]), l.push(c[s])
                            }
                            let o = [],
                                p = [];
                            for (let t = 0; t < i.length; t++)
                                n.includes(t) || o.push(t);
                            for (let t = 0; t < i[0].length; t++)
                                l.includes(t) || p.push(t);
                            i.length >= i[0].length ? o.forEach((e => {
                                const s = t[e];
                                this.disappeared[s] += 1, this.disappeared[s] > this.maxDisappeared && this.deregister(s)
                            })) : p.forEach((t => { this.register(e[t]) }))
                        }
                        return this.updateTrackable(this.objects), Object.assign({}, this.objects)
                    }
                    updateTrackable(t) {
                        Object.entries(t).forEach((([t, s]) => {
                            let i = this.trackableObjects[t];
                            if (null == i || null == i) i = new e(t, s);
                            else {
                                let t = i.centroids.map((t => t[0])),
                                    e = i.centroids.map((t => t[1])),
                                    r = 0,
                                    h = 0;
                                t.forEach((t => { r += t })), r /= t.length, s[0], e.forEach((t => { h += t })), h /= e.length, s[1], i.centroids.push(s)
                            }
                            this.trackableObjects[t] = i
                        }))
                    }
                }
            }
        },
        e = {};
    ! function s(i) {
        var r = e[i];
        if (void 0 !== r) return r.exports;
        var h = e[i] = { exports: {} };
        return t[i](h, h.exports, s), h.exports
    }(10)
})();