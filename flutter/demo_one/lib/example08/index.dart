import "package:flutter/material.dart";
// import 'expansion_tile.dart';
import 'expansion_panel-list.dart';

class Example08 extends StatelessWidget {
  const Example08({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("ExpansionPanelList")),
      // body: const ExpansionTileDemo(),
      body: const ExpansionPanleListDemo(),
    );
  }
}
