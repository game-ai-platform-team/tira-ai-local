from invoke import task


@task
def build(ctx):
    ctx.run("pex --python-shebang /bin/python3 -o ./dist/background-service.pex  -c cli .")
