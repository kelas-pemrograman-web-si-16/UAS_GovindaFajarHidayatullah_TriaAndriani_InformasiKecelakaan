package com.example.informasikecelakaan;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import butterknife.OnClick;

public class lihatdatakecelakaan extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lihatdatakecelakaan);
    }
    @OnClick(R.id.btnLogout)
    void btnLogout() {
        Intent a = new Intent(lihatdatakecelakaan.this,
                MainActivity.class);
        startActivity(a);
        finish();
    }
}
