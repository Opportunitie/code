import 'package:flutter/material.dart';
import 'right_back_demo.dart';

// 右拉返回上一页
class Example11 extends StatelessWidget {
  const Example11({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("RightBackDemo"),
      ),
      body: const RightBackDemo(),
    );
  }
}
