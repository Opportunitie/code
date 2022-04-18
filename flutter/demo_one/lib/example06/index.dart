import 'package:flutter/material.dart';
import 'search_bar_demo.dart';

class Example06 extends StatelessWidget {
  const Example06({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Seach"),
      ),
      body: const SearchBarDemo(),
    );
  }
}
