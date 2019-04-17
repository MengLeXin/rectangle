$(function(){var r=$("#width"),t=$("#height"),a=$("#calculate"),c=$("#perimeter"),i=$("#area");a.click(function(){var a=r.val(),e=t.val(),l=new Rectangle(a,e);c.val(l.perimeter()),i.val(l.area())})});

