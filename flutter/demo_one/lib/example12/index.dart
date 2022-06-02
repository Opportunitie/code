import 'package:flutter/material.dart';

import 'tool_tips_demo.dart';

class Example12 extends StatelessWidget {
  const Example12({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("ToolTipDemo"),
      ),
      body: const ToolTipDemo(),
    );
  }
}
