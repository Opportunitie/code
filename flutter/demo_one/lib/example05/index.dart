import 'package:flutter/material.dart';
import 'keep_alive_demo.dart';

class Example05 extends StatelessWidget {
  const Example05({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("State"),
      ),
      body: const KeepAliveDemo(),
    );
  }
}
