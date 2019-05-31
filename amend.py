import os

replace = """

  <div class="navbar navbar-inverse navbar-fixed-top navbar-font" style="text-align:center">
	<small>
	<p>This site was archived on 31/05/2019 - <a href="https://medium.com/@alexparsons/retrospective-on-lettingfees-co-uk-b017381ae073">read more</a>.</p>
	</small>
  </div>
    <nav class="navbar navbar-inverse navbar-fixed-top navbar-font" style="margin-top:30px" role="navigation">
"""

entry = '<nav class=" navbar navbar-inverse navbar-fixed-top navbar-font" role="navigation">'

def fix_file(path):
	print path
	with open(path, "rb") as f:
		contents = f.read()
	contents = contents.replace(entry,replace)
	with open(path, "wb") as f:
		f.write(contents)

def convert_folder(f):

	for s in os.listdir(f):
		path = os.path.join(f,s)
		if os.path.isdir(path):
			convert_folder(path)
		if os.path.splitext(path)[1] == ".html":
			fix_file(path)
			
if __name__ == "__main__":
	convert_folder(".")