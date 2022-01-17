import 'package:flutter/material.dart';

class CustomRoute extends PageRouteBuilder {
  final Widget widget;
  CustomRoute(this.widget)
      : super(
            transitionDuration: const Duration(seconds: 1),
            pageBuilder: (context, animation, secondaryAnimation) => widget,
            transitionsBuilder: (context, animation, secondaryAnimation,
                    child) =>
                // 渐隐间现
                // FadeTransition(
                //   opacity: Tween(begin: 0.0, end: 1.0).animate(CurvedAnimation(
                //       parent: animation, curve: Curves.fastOutSlowIn)),
                //   child: child,
                // )
                // 缩放的动画效果
                // ScaleTransition(
                //   scale: Tween(begin: 0.0, end: 1.0).animate(
                //     CurvedAnimation(
                //         parent: animation, curve: Curves.fastOutSlowIn),
                //   ),
                //   child: child,
                // )
                // 选装加缩放
                // RotationTransition(
                //   turns: Tween(begin: 0.0, end: 1.0).animate(CurvedAnimation(
                //       parent: animation, curve: Curves.fastOutSlowIn)),
                //   child: ScaleTransition(
                //     scale: Tween(begin: 0.0, end: 1.0).animate(
                //       CurvedAnimation(
                //           parent: animation, curve: Curves.fastOutSlowIn),
                //     ),
                //     child: child,
                //   ),
                // )
                SlideTransition(
                  position: Tween(
                          begin: const Offset(1.0, 0.0),
                          end: const Offset(0.0, 0.0))
                      .animate(CurvedAnimation(
                          parent: animation, curve: Curves.fastOutSlowIn)),
                  child: child,
                ));
}
