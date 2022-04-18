import 'package:flutter/material.dart';
import 'forsted_glass_demo.dart';

class Demo04 extends StatelessWidget {
  const Demo04({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('毛玻璃'),
        elevation: 0,
      ),
      body: const FrostedClassDemo(),
    );
  }
}
