import 'package:flutter/material.dart';
import 'dart:ui';

class FrostedClassDemo extends StatelessWidget {
  const FrostedClassDemo({Key? key}) : super(key: key);

  get child => null;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 700,
      margin: const EdgeInsets.all(16),
      child: Stack(
        children: [
          // 约束盒子组件，添加额外的约束条件
          ConstrainedBox(
            constraints: const BoxConstraints.expand(),
            child: Image.network(
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdesk-fd.zol-img.com.cn%2Ft_s960x600c5%2Fg5%2FM00%2F02%2F05%2FChMkJ1bKyaOIB1YfAAusnvE99Z8AALIQQPgER4AC6y2052.jpg&refer=http%3A%2F%2Fdesk-fd.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645020605&t=dbd1b865c3fa7a8c77559a6cbf642688"),
          ),
          Center(
            // 可裁切矩形
            child: ClipRect(
              // 背景过滤器
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 5.0, sigmaY: 5.0),
                child: const Opacity(
                    opacity: 0.5,
                    child: SizedBox(
                      width: 500.0,
                      height: 700.0,
                      child: Center(
                        child: Text(
                          '毛玻璃',
                          style: TextStyle(
                              color: Colors.black,
                              fontWeight: FontWeight.bold,
                              fontSize: 32.0),
                        ),
                      ),
                    )),
              ),
            ),
          )
        ],
      ),
    );
  }
}
