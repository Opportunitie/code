import 'package:flutter/material.dart';

class Airplay extends StatelessWidget {
  const Airplay({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Airplay"),
      ),
      body: const Center(
        child: Text("Airplay"),
      ),
    );
  }
}
