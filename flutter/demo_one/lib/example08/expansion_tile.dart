import 'package:flutter/material.dart';

class ExpansionTileDemo extends StatelessWidget {
  const ExpansionTileDemo({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("expansion tile demo"),
      ),
      body: const ExpansionTile(
        title: Text('ExpansionTile'),
        leading: Icon(Icons.ac_unit),
        backgroundColor: Colors.white12,
        initiallyExpanded: true,
        children: [
          ListTile(
            title: Text("list tile"),
            subtitle: Text('subtitle'),
          )
        ],
      ),
    );
  }
}
