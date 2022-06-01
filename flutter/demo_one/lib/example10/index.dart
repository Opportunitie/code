import 'package:flutter/material.dart';
import 'splash_screen.dart';

class Example10 extends StatelessWidget {
  const Example10({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("SplashScreen"),
      ),
      body: const SplashScreen(),
    );
  }
}
