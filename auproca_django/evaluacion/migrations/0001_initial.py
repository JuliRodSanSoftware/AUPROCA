# Generated by Django 4.2.6 on 2023-11-09 18:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Periodo',
            fields=[
                ('per_id', models.DecimalField(decimal_places=0, max_digits=8, primary_key=True, serialize=False)),
                ('per_nombre', models.CharField(max_length=50)),
                ('per_fechainicio', models.DateField()),
                ('per_fechafin', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Rol',
            fields=[
                ('rol_id', models.DecimalField(decimal_places=0, max_digits=8, primary_key=True, serialize=False)),
                ('rol_descripcion', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='TipoLabor',
            fields=[
                ('tl_id', models.DecimalField(decimal_places=0, max_digits=8, primary_key=True, serialize=False)),
                ('tl_codigo', models.CharField(max_length=3)),
                ('tl_descripcion', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('usr_identificacion', models.DecimalField(decimal_places=0, max_digits=8, primary_key=True, serialize=False)),
                ('usu_nombre', models.CharField(max_length=50)),
                ('usu_apellido', models.CharField(blank=True, max_length=50, null=True)),
                ('usu_genero', models.CharField(max_length=1)),
                ('usu_estudio', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserRol',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rol_id', models.ForeignKey(db_column='rol_id', on_delete=django.db.models.deletion.RESTRICT, related_name='user_roles', related_query_name='user_role', to='evaluacion.rol')),
                ('usr_identificacion', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='evaluacion.usuario')),
            ],
        ),
        migrations.CreateModel(
            name='Labor',
            fields=[
                ('lab_id', models.DecimalField(decimal_places=0, max_digits=8, primary_key=True, serialize=False)),
                ('lab_nombre', models.CharField(max_length=50)),
                ('lab_horas', models.DecimalField(decimal_places=0, max_digits=8)),
                ('tl_id', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='evaluacion.tipolabor')),
            ],
        ),
        migrations.CreateModel(
            name='Evaluacion',
            fields=[
                ('eva_id', models.DecimalField(decimal_places=0, max_digits=8, primary_key=True, serialize=False)),
                ('eva_estado', models.BooleanField()),
                ('eva_puntaje', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True)),
                ('eva_resultado', models.CharField(blank=True, max_length=1000, null=True)),
                ('lab_id', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='evaluacion.labor')),
                ('per_id', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='evaluacion.periodo')),
                ('rol_id', models.ForeignKey(db_column='rol_id', on_delete=django.db.models.deletion.RESTRICT, related_name='evaluaciones_rol', to='evaluacion.userrol')),
                ('usr_identificacion', models.ForeignKey(db_column='usr_identificacion', on_delete=django.db.models.deletion.RESTRICT, related_name='evaluaciones_usuario', to='evaluacion.userrol')),
            ],
        ),
    ]
