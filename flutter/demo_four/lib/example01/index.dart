//
import 'package:flutter/material.dart';
import 'bottom_navigation_widget.dart';

class Example01 extends StatelessWidget {
  const Example01({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('FlutterBottomNavigationBar'),
        elevation: 4.0,
      ),
      // theme: ThemeData.light(),
      body: const BottomNavigationWidget(),
    );
  }
}
