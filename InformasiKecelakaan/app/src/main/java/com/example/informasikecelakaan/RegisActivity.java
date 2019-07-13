package com.example.informasikecelakaan;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.Toast;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class RegisActivity extends AppCompatActivity {
    @BindView(R.id.edUser)
    EditText edUser;
    @BindView(R.id.edPass)
    EditText edPass;
    @BindView(R.id.edNama)
    EditText edNama;
    @BindView(R.id.edEmail)
    EditText edEmail;

    String strUser;


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_regis);
        ButterKnife.bind(this);

    }
    @OnClick(R.id.btnLogin)
    void btnLogin () {
        Intent a = new Intent(RegisActivity.this,
                MainActivity.class);
        startActivity(a);
        finish();
    }
    @OnClick(R.id.btnRegis)
    void btnRegis () {
        String strUser, strPass, strNama, strEmail;

        strUser = edUser.getText().toString();
        strPass = edPass.getText().toString();
        strNama = edNama.getText().toString();
        strEmail = edEmail.getText().toString();

        if (strUser.isEmpty() || strPass.isEmpty() || strNama.isEmpty() || strEmail.isEmpty()) {
            Toast.makeText(getApplicationContext(),
                    "Lengkapi data", Toast.LENGTH_LONG).show();
        } else {
            Intent a = new Intent(RegisActivity.this,
                    MainActivity.class);
            a.putExtra("user", strUser);
            startActivity(a);
            finish();
        }
    }
}
