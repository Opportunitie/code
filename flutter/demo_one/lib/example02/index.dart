import 'package:flutter/material.dart';
import 'bottom_app_bar.dart';

class Example02 extends StatelessWidget {
  const Example02({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('BottomAppBarDemo'),
      ),
      body: const BottomAppBarDemo(),
    );
  }
}
