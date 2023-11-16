from django.contrib.auth.models import Group
from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Usuario

@receiver(post_save, sender=Usuario)
def agregar_usuario_grupo_docente(sender, instance, created, **kwargs):
    if created:
        grupo1, _ = Group.objects.get_or_create(name='Decano')
        grupo2, _ = Group.objects.get_or_create(name='Coordinador')
        grupo3, _ = Group.objects.get_or_create(name='Docente')
        instance.login.groups.add(grupo3)