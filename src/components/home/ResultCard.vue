<template>    
    <div class="result-container">
        <div class="title">识别结果</div>
        <div v-if="data.Status === 0">
            <div class="item-gallery">
                <!-- 行 -->
                <el-row v-for="(row, index) in itemRows" :key="index" :gutter="0">
                    <!-- 列 -->
                    <el-col v-for="(item, i) in row" :key="i" :span="8">
                        <el-card :body-style="{ margin: '0' }" class="card-container" style="margin:20px" shadow="hover"
                            @click="showDetails(item.InfoCode)">
                            <!-- 图片 -->
                            <div class="item">
                                <img :src="item.ImageUrl" class="image" />
                            </div>
                            <div class="name">{{ item.Name }}</div>
                            <div class="description">{{ item.LatinName }}</div>
                            <div class="bottom">
                                <!-- 植物科 -->
                                <div >{{ item.Family }}</div>
                                <!-- 植物属 -->
                                <div >{{ item.Genus }}</div>
                                <!-- 相似度 -->
                                <div>相似度：<span class="score">{{ item.Score }}%</span></div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="item-gallery" v-else>
            <el-empty description="暂无识别结果，请换张图片重试~"/>
        </div>
    </div>


  </template>
  
  <script setup>
//   import { ref } from 'vue'
  import { computed } from 'vue'
  import { defineProps } from 'vue'
  import {  ElRow, ElCol, ElCard } from 'element-plus';
//   import {  ElRow, ElCol, ElCard, ElEmpty } from 'element-plus';

  import router from '@/router'

    const props = defineProps({
        data: {
            type: Object, //数据类型
            required:true
        },
    })
    
    const rowSize = 3; //每行优惠券数量：33

    // 计算属性，计算imageList中图片对应的行；每行3列
    const itemRows = computed(() => {
        const rows = [] //二维数组，rows[i]存储第i行的商品卡片（3个）
        const rowCount = props.data.Result.length / rowSize; //行数
        // const rowCount = itemList.length / rowSize; //行数
        for (let i = 0; i < rowCount; i++) {
            rows.push(props.data.Result.slice(i * rowSize, (i + 1) * rowSize))
            // rows.push(itemList.slice(i * rowSize, (i + 1) * rowSize))
        }
        return rows;
    })

    // 跳转到检索详情页
    const showDetails = (infoCode) =>{
        router.push({path: '/detail',
        query: {
          code: infoCode, //根据所给码查找植物具体信息
        }
      });
    }

    // const itemList = ([
    //     {
    //         "Name": "日本晚樱",
    //         "LatinName": "Cerasus serrulata var. lannesiana fdsjkfjdsklj",
    //         "AliasName": "",
    //         "AliasList": [],
    //         "Family": "蔷薇科",
    //         "Genus": "樱属",
    //         "Score": "77.97",
    //         "ImageUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOIAAADfCAMAAADcKv+WAAABZVBMVEX+2iUAAAD8NBH/4Sb/3ib/3Sb/4ib/////5Cf/2iX/NRHNRBP82CXpyCL31CRWOwrjwyHy0CPMrx6IdRTauyDGqh3ApRyxmBqjjBirkxm5nxuYghbTtR+eiBc3LwiDcBNnWQ8jHgUsJgZaTQ1FOwpgUg5yYhA+NQmQfBVRRgx8ahJbTg2FchMcGATmxSFrXA8RDwNFKAcoIgU6MQhDOQpNMQgeGgQwKQcMCgFsUA43JgZjRwxRNgmJbRIeAAB9AAaTdhQkDwNEREhlY2nSrwBhSQBRUVQ3HgYyMjLq6uqOjZKxkQB0cHIvFwSmhxdQT1fBwsSfoaSzs7N4XA8jIyMpGwXT09NALAeQhBYjKQbEGwzeJw+eCglYAAKolhlmFAa/GwxfXxA+AAFMTA2IAAcvOQkqAAHAJgwOHQRuBgY0AACZGgrkjhzKMhL0viJBIQfsqB/ZbBfWURXXmByUMA6IIguzOxFgYgGKAAAZcklEQVR4nO1dCXcjx3FGbR875M7MzgCD+74xIHGQxJKUd1eSTzmOo8RyFEl72dJasiVLieLI+f2pxjn3hQGo+PF7z5Ytonu6uqvr6urqTOYe97jHPe5xADB21yM4NJSswjhlJ3c9jgNCBWi0ygYl9B92NaU+LNEqaYT8Yy4mrcAGjZHGyD/iWqq3sMNNVZPoXY8odZAx2GBWZHLXY0oZzLCTeAvzqvrj5VfGKCWEc4nJ0RtJPRuJcsEEyCn8x0cko4SrilGpj2a9NoASfYS0YCNRIaSGUrap/6iIZLhyWiXXvdyOc8bjNG9YSTRYhknaQBD5Y9mTlKtGtW/fT2KcMXqoWJtmRVNGtBnAKPMjkK6UqJXWBJwwYw3thFqXsbhqiyvZhdvKHcsdxvWic/lWyMebfZq3tG1u2JORbAdM7Q65lWSyLYB5M5u5dVJ4FXdYxNw17u8aU1YCqN6R8cqIWkLhMq5lCFX3XUTsTts1vrbqG6L34eouFpIRpQmwKGbETmHKfjtxCXK+a27TN4ygLCpK6Y09EhhX0Obq1+haLmhOEmtJOGu+bV6xzxDRezCTj8qsRBA42FkfrOagsJVkzi0Sp+ngS8ZycDM9HrPSTBUJnFpkOcs6SIxh2Fiws8YvXdRwpL9yJGZlPD+BvmYzrWjZTmE96Xxv1avmmiOqNGB0FDOA6jO4zju0sVVSIG6S7hq6ZfiimxiWmUErc/ANyTgKt5zLpiIzu6xJPNmkvtnMXnzAqzDUD7yQVO3D0HB9/SRzZaXwPI797eiJnK078fwzao+JclAaJdzyI6+Yp2yl8DKGn+gCk9urXgqelBDkZPcUpwYhuNuG1wrZ1aKx1zTTdV8Db1Yg+OfsoWikqH4HqufwbZ5QNTmbLkFW2nGi+g2jfSgaBYv4GVFktKOwT/eNg/KVyPEzcql+eRgaeRHmvptA2jkJt+r+Up00AzgVt4V6DbX0aURhHiSu2yltxM3X+r4yVYAhr6byHds3zyFA6VqkTSGl2RVsUfGlgqJjk7Lu4GMYBIx9Fz7bV9RswORFoD+GYneip2nnkAGcB60Oya0pbKZmJjMVne2pPxEkC4u0voWQxi7fxvG9tbRppcg7TO9AM4AnSAG6qYkc9HBywfzHVhR2U90dTJ8Hyk1ULaOUaOTnIWu48YfNlL1yqgTreJz6cipbn1RhHNIRLQkKe6FuDqNEysSwXwWN+SAae3u4NJZuyjALGzo/C19DRoisVEY90GN8XOzHgv/8ClbeX6yivdgL7URFxd8NWENGuJrdHAfE+jxTh0HMSI0IowsB9tEI3WH4I1xpv19RotaqQ6St0yrXUPvEGwCTh1DypxF5zMc3XZ0AEs65hP/B/0Wp5xAFJ4TGmRhaIk3vLcGopFdawmvIFZZZJ5LZiTnrjPUh578f0SapOP8qTgBlxSjUc81B3xx2hmZ/Ns7VK4aicldKCLsKNwWJdg0lL43PCNXquHzzWUWXyCqpht+cxZYPdAaDgHD/jW0RkDyqFce9TZTrtt1YNNqbw4j5Ylw0UCrsGqDBXwzTPCL05yHZsR+t2sBORzWVb6k6YZMgO9AH6KmZvu4Lm8Jwd8RDtfIyiNQbjAq1KZOWfLr8bzat5auDpYlyVq2p0mrSSDHYbBOd0pFHABfpM6oognp1TbJH6vQgpvOnsQw3vkY3jrIq+qREzp6L49t+WVNxBM6th5sT/6WqFQdihc2ywghD92ERwlVUN6HlFEeUKvUbgGFJoc5zQeyynESRSWjm+xo6pAUi7Sovosxm3cjwwEMsQei0MkDWXdSntBEmasSXS/YvMyJXugANXD+PLzFjdfwbGyJgUyHe0QSmQkepCgu5orom1bsF/syoi20U4vtRuQlt+5EYpUZTiE/N51O0Eu9w3NJSv4KRj/JYBo56KNPiMIgQFqOQbARudGAsW3plJFPs4VbIy75TicZgsrMOMfMt6PuoaDIYJEm3CslDo5kc3OYtugIXEDdDp6rzgG+h4Zw8hw/np6F489VJwmSAE//BMF67hNYulIPzURELmM0Ey0ti3uwRJxf6Ke+zIdMG0QdwW5DWM3fCuDICaFfD04Co90lF5O9qHXQRj3COSsVB23gbMqZUpDmZ+UyUb69UWGKwTAu61mD1QchlPNuAhbHehagjiih8m1rQDty1NbyO1GKBlOB2pyHpAU5wGBGpPsW1ymNEcGin7C9C7aCFpDpjB15DXbzeEVJ9//4cwE03ABitNQWVDLQHu3kWeSZRJsZxiL1B1bM1s+KKdvc5A3P0y5ZrhmphvEq7O6EsjzJ0HI1D1+D9dgpDYrQK85okTiDO0tuMtFSVuI6Gy2ydwkBJ8QqgqscTb/Sqn0bI7IQbc5SsWeilGdPsQ1kQuE5hIGoJ4KYcO0tdD/VcIoKqMzDn7RQOiCxAphxoZJVBqaLN2yjET6FEP8P/lCImJFRcWsphW5gQ0SPjOgpRMxtnC25Ai+kJQHQhyykfv9EsjAmuoJ5Dr9mgieaP5GLGpvyBU26mfsCIFrQhCQJbhpRwKaRFO61THRyNO/Vob8hg4h5sacltRCIYIRXgIs4OcBIujvP7xh4J90mjGh6gpdTNGgGcuUFSFl0iucvvAh/OD5Lvx/uwl22C+2d/820FNbVjNztwFZLFljbte720tmI+flZ2NKiJgqBbpGbb7BMCCuvZvNzjxJLVfLLaEgyktVeWXVDPo30mj9ZTOAtcd9UzU0oMcfWcT5bTvoJkQlrjkq/3CgEFABVbaQ9WS03xo1BIrSsn9hEYKcRtLOPYS+4FgSc5OlsDt2JqVqV+ILWIkG4SXKFZg/TbqV1md5LIxHl3fNtZXLjkxE4RN2+S81pgEl082ElkLPv+O0/feT8bL5DD2C9Es+d567mMOMlLymuoFVPz+O17kdTe+ak4+/3Zz3/5ixiTSKe//PmvRLufPrWm9uxx6pJKfHED1ZLORSsfiIH++p8ePnz4m3+OTCP9xW+xwcMlkf/y4W7y0W1Puop8OEzPqlTnW6ZnxsUyUUFQ+PDhv0bNw2X6r5cNHi4bf7CzeHEpkp4OKqnK+Zv+1op4uszG+NVqwP/204gd0F/+btXit0saL7aZ9uiJJiQRvZQ9DCNXb+bGgFuzKfx8NeD/iLjhUTJ8tGrxm9UyfriZfyQx4aDIYD9f0w7ev1rPF/39T1YZNZsBvxOJRPL+ZlL+fdn646eb0SUm8YRCK0XDmQw2dzjYkzWJv10tInwQiUT+FFbLuFpE+PiJsv4LkphsLWgtPests0x52ojni0/WiVE/+91HYl99EGk7kMdiVj766Ffrxj+52LhQSKLPDZgAnDDKRUwjRR9259Wxi8e2m+iTi0if4U8/traCZzsSy7EdRkaYUmwlujztj53XT58+/sQ21qfR9uLvn1ln5iePH2+4ghZjmdK4fCx7LvI0Z8VULxygSb8h8cMnVhqfPfkwEom08uTZ3ELhs+dbiRpD9FOS0UpdkfNTrRGSbjBpRyJTnjx+/Ozj7WI8ichl6uPHj9eCaoI9XGyjnywbLfyCJrxaGHew/biiR8vZigVLeIoUL3C0j5988skz/MeFV+Ilpe4jGJoVzZ598smTZev3t+I+yukZcmfGqIqkyG7JcGe4pgI0JLcGL3u+HOUST557fE0tlct1l31MPrzYNXvHoifUkMgGChe9MkMub+fy6uFqutmCzqx68Ww50mcXVY8PrspGuEg8oeWLJ+tmz615Z0FBE1w+uTZaiIzCoub0NNMFb3Us/49ozx8/wfE+967CwTKypzInyvtPn4lm9ixQtuh5GykoXKZlIVyuqqKmyKETnK5sQUZG1Kk2DSrG5ekBMiIr2tSZruB5LCGWL9+8QfoGFYUcIX+LuWM3LFnZSo9mtOA8TEDyjJIo/mUeTLi4gOo5RbfFCRn6FhZB3VAZtJG+Zl4/YsFI3gOJrm5eHKB3FNe7O4X6SFgu/bImHVS4OMEMqBqfjlvjTytK9Myt6N0rVpnaB9M4oG7wAZnBZ++9ePny5YtXrxtvUg2oCt4g0szibLDFIS5mh0GFPzw4XePBn96G5he5jBufBozob3JnrU+1GuS3PxGXYVO/mB0GFHkPTh9scPrHz9w0WofEpGw3b0sc98nw5MbnX7wSvPH63CqwkW/nqfoQEUByr3cUIo0v3jpLJajVbfSXEkNcPFwUdgnBpAIFj+sV8uevX65Z4xVcWZPeDbg5bkWoDH/7ykrig9M/vXHosSJc1VACUsJpBY3lkVICuKwqQqcxKmW9qpww9cs/nm66RRqt209cWj4uq0qfvbCR+ODBu445FuXG2rl6fYTm1kSUICVUJOd3csVsDd1zj8vyTLV2evoSFOtfedm/UMRBwD97aSfx9JXTw6NqSRhbcDsurAvJUrq8pCYw9thZ5K112pBEu+dPzlOrVxAJkovEF27fgErydCpbnQFGJNXIZg3VY6zkUxvvu0gUeiqdi9nRwL90MuqDt54leDxkio8pq39l390vXSEq1oPs8fYjab5ykHj65X4Cj5b+aCfxz65wsVCP6aa/Bg6o8tpJYmO/HqXhAzuJf/2Liy2EZ32gXB8P6ODg031XUf/Csblfe5z2iovjh6/PtgZ56+RUz70YGSz7JweJnhEqkgfzWCTSvH0ZvSRqrP4qDlvihfdpLynB4FjFPcmXf7XJeJdejAf6xiFtvvbJSpByh8sUcY6pBlbVePrNfud69E2IVtz9chZ+Qz4lkME3VnPr8/20smMvnr7nz47oPR6sBJ0D8u3XW5v5wVf7CnP5K/si3vjWDGZq51jeI7LqmrlOH3wTVC4mEkjJwqmnXw0A6n4p8Ef0HkkR/ozDOj198e7+nHNCt1b46el7byW1Cz2fS8tCPXaO5D3yqqDx1Refp3FJk8mfvVoHSv76FxWdyrKoW+hz+xy9xyOpR6Txi7dvUnrFgLH6Z1+/997XHwBMlzcjlR70fQr7HdF75H0w03tWhMi6YWjbGoGMVcGvJhTPHct7JCgWbj0rmSYD48qlJaAoGQsYeOe0Hc17JIMbA6CcWhTXUVuWaD0YetoAjOvgFeFKH2R2I4lCLd4FW2MDt9jt7gycyueiILTXeSXXxuKO/zFIpGdXEiNVUehy/89RuQUtY0MiE4VJBqq7EMQJZVlT3MY9yusXJ2woDhm5cYkLua/U4bU2VIm2JpEoXWhn3bKaEVIciqDlsR6jkVdpyqJuEpT2Or6hahOuDY6Wi0jxonJVVHZ3dciIXhVFDCJVoUgHKtRXwxCCoeEx6RHBSH6yqqchTmYZybahr7h4lJIpbsFe/uSIZziWTGxGKnM405IRybUzuMwufQu53ZKUGUwKLsOGkmwft6CR5AZ1ctgyuZbMNVDisxDRz3fvA5HusOxZ2T5TGYpHr479wo6jLiDRx/FfpSJyHaA13ahxIZ57msNZZFytz2FSuoOny+ilvWgeI8hjMI7hOxK5hAquths68n7VwaOMaE2ku3CA0+hQsKmrdA4q5Vn0t60Iw8W5Kdi0O3E8dEKlWguXuXbUc/7d18sexDBJyUXLDV8qgGHBIT7I2JpvSzKFBsC5stcF6j1AzLlXkXkWSabT5btD7io2LGuJoKqlNircmIVSUgSq6eTxPrIswOClAOTJ2fqwTtxXRnrv8gWvXFDB7RCw/HjqvTjY7UpefasSPoLiUQ9OHVDhbI8J9q1iw7SlEGPk2+++VSXz+LkaO5DSgVLESG+OFP6nrD767tG30//6OH62f2qA4WFOF9CLQj3y/aPv//sR4m8/7BmFTg40Q/YqohCEyYJTsYYrvC7djcBh+uGyREgd/uf77//2aIN3j3c2bIU0Sy5OQ9up8Pfvvnu0Q/sutiPNJn/kiWlhvyAjeGTFD2le9ooKeTKJcNrmqRiEZRvGeCr8YKPxm31qGSQDH0fJD2Fa08Pp8LRsHbAv4w9fjQ9QASoYNB+pNAPzvGtH+vPw8erwvxsC//7uHbz+jNK0E/6rjCjF6lVJIsr0kNEXKwK/bn96B47wCY1qVZFhw508k410EVdeLuMfbt/sHbxMAl6NWuGOnLvvWqKVHUUFkPrrR6+/rNyRI2xAN6IM9yodSIbRClWqc4hREjVdqNe3UY+hmeFiyshOJikfM6nPBj6I8Wl35RoUxhFNWzZJsdBCHNBC2EtJVrjftUCNF7EIBnJ5WnWy4kG+vYnxa9Jyplzyxk1UF4xdxn7+Ow3wUawd4rq+fkKjF8HAZTxQpbkgoLCIVVQL2dq+82LVo2Ht4d7PSMYGKrVY1iLTHCYcrky4D7b5Ab0LoSpDP14wQ3bwJRlEUPz5jUBisDj2s+sJLi1e2s0E2gstjGspc4bu/wEvSXqCmJdxW/RvbCTp4Ta45UQP7f1UKoBHB4tf+400bYyJ7nBoKRM+29VJOUyt4ACgZRI3D4TWbeLFJWE9wDq7lUNxFfT8Y/ogVduSRDlswFmxGuKi7GVIC3tFRslMUBdmD5A+WC/clSJczXBUK0XGCxOR9rgHLnuaRXp8QfjqBEm6tFYUQMslfJ/g5qtbhsiHnTC+k7q2W33yJNUSNl6gsnpSveqWhPPNbaYNi+Qz2BWjFF6HW7bL3P3qwUYBXT6jbbYBqoxJtnqHaMxFCP3Z24SXcHYWY7ZszcPYcqiGW2XoSRmtDw1DshuocjuCvSo1LPWfIxR3JX1HgJbNl4UuREiWJKvpHwxcRFVqo9HGxK3ScsNW3YM7R+MF3p1bSAwtlYyq1/GsLWldYxOujBZXpVIl/bR33gKdN5dluagu7jxb5WGkElEoQ3dDdqgQr5+7XsoRlcrEs2/Q63hWlNkXMsBYMlZ+vnjrBay52rgZ66GcirrUQmLopJBr5ztfIopXu4aZIc1AqaSvQijOmyENVmHTE+54npA0QlWAUC27iQ+tNY7L7KSBjG9H4hkdkoWclIv5Um0EiNzvnqRCZ7XpiGF7RZ5GeH8JNfnOgrOUx/P5XtdlzOBeEYn+TJ2AjEyVugphWTChLOVhttqEVG9Yss6RU0NLQ9tCqWQQLKBQgDuVyvpJqxO0rGrSGGbpb8ZMY2jCVDrfxL+ZbFqSwiI8moAW2M7lI7PgIsRCutn/DSnDXFzlQRavShUYnU1SK7a8HSF2C0NGzc0r2cv3e7cF22rOBzzdHVhtINK6Ctq8qDbtzhqjTTCFhCMFaKHY62mHuLwo9aAEY66ur8CIQQ92j47QRZhqRFbfhdFodxFEIi6ibacx1YRzcUV+eYdYv52r/UNYczizsxxuR2NXM8Jy0oBsGHKCY9P2rOdTGWzzKdvhOlUuV48t4x9QWw1BK+z56KAPxEtLLahI3qVH+SJEijPDSuIi6GkDlChW40WI7+zy56iQNakPBR23TLzBRwQxwWhUqHeFGpoNmVgries7D36/rNk2GvYMm2uaTEGNWJWGh4pyiDNhYf/63LML2R7RSeQ9q05E5rzcmVJSFa2sweEuEaM4C6gfqAVfs7PuxUASUfTapDMr7bgWlesZUnmwdxGWZqL//EnNwFNxJDEfaS+yxrVdOFvSqdl4QUrxjhriQkgzXzJUWARwqi02wExfiYpSzf+w44SxMvQjDDQ50FLzf4SQFIMUh826CdCLKrgzH3bgZTAPXFwDxZt/lAjlhL/Esb3d5W/dkFxQaB+XuJus4GMMiM3uN8si+uEvRcoWSe9ro7Jp0E6TSmAe4QY4ulW+Wdq86v9Yu91f9PM00InyD1mQOnSPU61w6H/Yd3LjO0L0KXe+gZ+/SIMsM2kEreMUuWH6BPzu76OZ7HfuiArHcjfYz+u/bft+FzuYHesclWrQ9lsrPoKK9zKQljV2U/Y0wUhAAgEdw/iINbWycOWSaxvvY+izPrzXsJBY8CJRODM+bMpoP7VH6iKBVODMOQZFX//T54FiPrEcgqLz6BHsIUO/nSwcxio/akYDWlF9u2zbHnOg6vIsl0DgXCIbcMMjzcT/XVyqd45WvmcLqe7QUHy+WSQy89xQOvRyOwzcJz24/qZ36olwGPPHTwrHdVxYw8WWUxl54sFvwmG3wbVj+dk2Cum45Ze1VWo4HngFbi0FhSxna6g5XNuR4UoUpC0K7vA5Wribf6c2rXYB8u9lGkVmEkCUwahs2Adtt22sikkVp/SjtbLV0VABso6b7Ohv99Z/502rT8IGYKb7/HgMUKUBubXQQSO7xLkQJJKk14qTTXxH/JUSkhFvguxkKDWunUFCcgbZ1Q1TUWR6az4QrQHnxy4xbQHLjGFoLHPSRTT+1hyPBt1l4VPxvD1dBgWpqLxRnUE5Zzu5l1sw4MtS46vxi9JEkNNFejQas5s9uaxY5Gv1Hge8KO59SwQ317jQEodi8+FsVNHQcdLzGsc/t9Tl8fJYIrJqYU1GxlAsFBQilZdyh4CpdQFaeVWSxrfr0A3R+7Dwqzt1NCxv8E/GJnRUSpavEopC8LibBEpFEGs6I3pZDNq2+Zi6/Em5jMagKA8u+FwUdoF5t7MSyJTh/FWPfjHDDUamo56rIG8D+vX8GUAvY3T6zKkFVg2VqaKZ+BNoFHuDgsjnYETNj8xrnBs0ElilI3bBsegIBEMRw+1DkRUJNxovmkGPMogqt7x0xlHrTXD1VtenKHKCZMJsNAO4Kf4IljAEK0kSaFniT0i+LKtG1RJiV0Uhq9md3Vw4AAQpzJaDQTL6YV9yucc97nGPe9zjHve4x/8H/B8T3cv4q08RogAAAABJRU5ErkJggg==",
    //         "InfoCode": "VRSIihzEBztyp3Hl"
    //     },
    //     {
    //         "Name": "大叶早樱",
    //         "LatinName": "Cerasus subhirtella",
    //         "AliasName": "小彼岸",
    //         "AliasList": [
    //             "小彼岸"
    //         ],
    //         "Family": "蔷薇科",
    //         "Genus": "樱属",
    //         "Score": "20.45",
    //         "ImageUrl": "https://assets2.razerzone.com/images/pnx.assets/f061ffae46148875f7fe06b455e03e27/768x500-product-mobile-pikachutwspg-panel2.jpg",
    //         "InfoCode": "VRSIihzEBztyp3Hl"
    //     },
    //     {
    //         "Name": "日本晚樱",
    //         "LatinName": "Cerasus serrulata var. lannesiana",
    //         "AliasName": "",
    //         "AliasList": [],
    //         "Family": "蔷薇科",
    //         "Genus": "樱属",
    //         "Score": "77.97",
    //         "ImageUrl": "data:image/png;base64,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",
    //         "InfoCode": "VRSIihzEBztyp3Hl"
    //     },
    //     {
    //         "Name": "大叶早樱",
    //         "LatinName": "Cerasus subhirtella",
    //         "AliasName": "小彼岸",
    //         "AliasList": [
    //             "小彼岸"
    //         ],
    //         "Family": "蔷薇科",
    //         "Genus": "樱属",
    //         "Score": "20.45",
    //         "ImageUrl": "https://assets2.razerzone.com/images/pnx.assets/f061ffae46148875f7fe06b455e03e27/768x500-product-mobile-pikachutwspg-panel2.jpg",
    //         "InfoCode": "VRSIihzEBztyp3Hl"
    //     }
    // ])

  </script>

  <style scoped>

    .result-container{
        width:70vw;
        border-radius:15px;
        margin-bottom:100px;
        padding:30px;
        background-color: rgb(216, 244, 229);
    }

    .title{
        font-family: fangsong;
        font-size: 40px;
        text-align: center;
        font-weight: bold;
        margin: 10px;
    }

    .card-container{
        display:flex;
        justify-content: center;
        align-items: center;
        border-radius:15px;
    }

    .item{
        width:250px;
        height:250px;
        display:flex;
        justify-content: center;
        align-items: center;
        margin-bottom:20px;
    }

    .item-gallery .item .image{
        width:100%;
        height:100%;
        object-fit:cover;
        object-position: center;
        margin-bottom: 0;
    }

    .description {
        margin-bottom: 20px;
         /* padding-top:10px; */
        font-size: 14px;
        height: 20px; /* 设置固定高度 */
        /* white-space: nowrap;  */
        overflow: hidden; /* 防止内容溢出 */
        text-overflow: ellipsis; /* 将溢出的文本替换为省略号 */
    }

    .name{
        font-size: 18px;
        font-weight: bold;
        /* text-align: center; */
    }

    .score{
        color:rgb(29, 187, 103);
        font-size: 20px;
        font-weight: bold;
    }

    .bottom {
        /* margin-top: 13px; */
        line-height: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }


  </style>