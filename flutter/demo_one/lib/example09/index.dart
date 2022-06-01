import 'package:flutter/material.dart';
import 'custom_clipper.dart';

// 贝塞尔曲线
class Example09 extends StatelessWidget {
  const Example09({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("CustomClipper"),
      ),
      body: const HomePage(),
    );
  }
}
