import 'package:flutter/material.dart';
import 'wrap_demo.dart';

class Example07 extends StatelessWidget {
  const Example07({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("warp_demo"),
      ),
      body: const WrapDemo(),
    );
  }
}
